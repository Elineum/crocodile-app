import { Socket } from "socket.io-client";
import { SignInForm } from "../SignInForm/SignInForm";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import "./Authentication.scss";
import { useState } from "react";
import { Button } from "../Button/Button";

interface AuthenticationProps {
  socket: Socket;
}

export const Authentication = ({ socket }: AuthenticationProps) => {
  const [hasLocaleData, setLocaleData] = useState(true);
  const [rightPositionForm, setRightPositionForm] = useState(false);

  const formToggler = () => {
    setRightPositionForm(!rightPositionForm);
  };

  const formPosition = rightPositionForm
    ? "right-position"
    : "default-position";

  return (
    <div className="auth-comp">
      <div className="auth-comp__sides-wrap">
        <div className="auth-comp__side">
          <h3 className="auth-comp__side-title">Already have an account ?</h3>
          <Button eventFunc={formToggler}>Sign in</Button>
        </div>
        <div className="auth-comp__side">
          <h3 className="auth-comp__side-title">Don't have an account ?</h3>
          <Button eventFunc={formToggler}>Sign up</Button>
        </div>
      </div>
      <div className={`auth-comp__form-box ${formPosition}`}>
        <div className="auth-comp__form-wrap auth-comp__form-wrap_sign-in">
          <SignInForm socket={socket} />
        </div>
        <div className="auth-comp__form-wrap auth-comp__form-wrap_sign-up">
          <SignUpForm socket={socket} />
        </div>
      </div>
    </div>
  );
};
