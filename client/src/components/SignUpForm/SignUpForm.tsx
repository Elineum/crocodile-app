import { useEffect, useState, FormEventHandler } from "react";
import { FormButton } from "../FormButton/FormButton";
import { FormInput } from "../FormInput/FormInput";
import { Socket } from "socket.io-client";
import "./SignUpForm.scss";

interface SignUpProps {
  socket: Socket;
}

export const SignUpForm = ({ socket }: SignUpProps) => {
  const [mailPossible, setMailPossible] = useState(true);

  useEffect(() => {
    const handleExist = (currMail: any) => {
      setMailPossible(false);
      console.error(`${currMail} already Exist`);
    };

    socket.on("alreadyExist", handleExist);

    return () => {
      socket.off("alreadyExist", handleExist);
    };
  }, [socket]);

  const submitHendler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const user = {
      name: formData.get("nickname"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    socket.emit("signUp", user);
  };

  return (
    <form onSubmit={submitHendler}>
      <FormInput text="Nickname:" type="text" name="nickname" />
      <FormInput text="Email:" type="email" name="email" />
      <FormInput text="Password:" type="password" name="password" />
      <FormButton text="Sign Up" />
    </form>
  );
};
