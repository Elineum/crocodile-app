import { FormEventHandler } from "react";
import { Socket } from "socket.io-client";
import { FormButton } from "../FormButton/FormButton";
import { FormInput } from "../FormInput/FormInput";
import "./SignInForm.scss";

interface SignInProps {
  socket: Socket;
}

export const SignInForm = ({ socket }: SignInProps) => {
  const submitHendler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    socket.emit("signIn", user);
  };

  return (
    <form className="auth-form" onSubmit={submitHendler}>
      <h2 className="auth-form__title">Log In</h2>
      <FormInput text="Email:" type="email" name="email" />
      <FormInput text="Password:" type="password" name="password" />
      <FormButton text="Log In" />
    </form>
  );
};
