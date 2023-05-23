import { useEffect, useState, FormEventHandler } from "react";
import { Button } from "../Button/Button";
import { FormField } from "../FormField/FormField";
import { Socket } from "socket.io-client";
import "./SignUpForm.scss";

interface SignUpProps {
  socket: Socket;
}

export const SignUpForm = ({ socket }: SignUpProps) => {
  useEffect(() => {
    const isExist = (data: any) => {
      console.log(data + " already exist");
    };

    socket.on("alreadyExist", isExist);

    return () => {
      socket.off("alreadyExist", isExist);
    };
  }, [socket]);

  //TODO перенести логику хэндлеров в родителя, без повторения кода. (2компонента)

  const submitHendler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    socket.emit("signUp", user);
  };

  const guestHandler = (e: any) => {
    e.preventDefault();

    console.log("Guest login");
  };

  return (
    <form className="auth-form" onSubmit={submitHendler}>
      <h2 className="auth-form__title">Sign Up</h2>
      <FormField type="email" name="email" id="sign-up-mail">
        email
      </FormField>
      <FormField type="password" name="password" id="sign-up-pass">
        password
      </FormField>
      <div className="auth-form__splitter">
        <Button>Register</Button>
        <span className="auth-form__split-span">or</span>
        <Button eventFunc={guestHandler}>Guest</Button>
      </div>
    </form>
  );
};
