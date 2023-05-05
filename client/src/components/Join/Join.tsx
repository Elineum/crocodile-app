import { FormEventHandler } from "react";
import { Socket } from "socket.io-client";
import "./Join.scss";

interface JoinProps {
  socket: Socket;
}

export const Join = ({ socket }: JoinProps) => {
  const registrationHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const user = {
      mail: formData.get("mail"),
      name: formData.get("nickname"),
      password: formData.get("password"),
    };

    socket.emit("signIn", user);
  };

  return (
    <div>
      <p>Join</p>
      <form onSubmit={registrationHandler}>
        <label>
          Some text
          <input type="email" name="mail" />
        </label>
        <label>
          Some Text
          <input type="text" name="nickname" />
        </label>
        <label>
          Some Text
          <input type="password" name="password" />
        </label>
        <button>Reg</button>
      </form>
    </div>
  );
};
