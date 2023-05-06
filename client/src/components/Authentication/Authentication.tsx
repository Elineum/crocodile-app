import { Socket } from "socket.io-client";
import { SignInForm } from "../SignInForm/SignInForm";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import "./Authentication.scss";

interface AuthenticationProps {
  socket: Socket;
}

export const Authentication = ({ socket }: AuthenticationProps) => {
  return (
    <div>
      {/* <SignInForm socket={socket} /> */}
      <SignUpForm socket={socket} />
    </div>
  );
};
