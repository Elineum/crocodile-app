import { FormEventHandler } from "react";
import { Socket } from "socket.io-client";
import { Button } from "../Button/Button";
import { FormField } from "../FormField/FormField";
import "./SignInForm.scss";

interface SignInProps {
  socket: Socket;
}

//TODO перенести логику хэндлеров в родителя, без повторения кода. (2компонента)

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
      <h2 className="auth-form__title">Sign In</h2>
      <FormField type="email" name="email" id="sign-in-mail">
        email
      </FormField>
      <FormField type="password" name="password" id="sign-in-pass">
        password
      </FormField>
      <Button>Login</Button>
    </form>
  );
};
