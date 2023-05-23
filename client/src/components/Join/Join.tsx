import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import "./Join.scss";

interface JoinProps {
  socket: Socket;
  createRoom: () => void;
}

const localeStorage = window.localStorage;
const currNick = localeStorage.getItem("crocoNick");

export const Join = ({ socket, createRoom }: JoinProps) => {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    currNick ? setNickname(currNick) : setNickname("");
  }, []);

  useEffect(() => {
    localeStorage.setItem("crocoNick", nickname);
  }, [nickname]);

  const changeHandler = (e: any) => {
    setNickname(e.target.value);
  };

  const privateHandler = (e: any) => {
    console.log("Private");
  };

  const quickHandler = (e: any) => {
    console.log("Quick");
  };

  return (
    <div className="join">
      <h2 className="join__title">Join</h2>
      <label className="join__label">
        Nickname:
        <input
          type="text"
          value={nickname}
          onChange={changeHandler}
          placeholder="Your nickname..."
          className="join__input"
        />
      </label>
      <div className="join__button-wrap">
        <button className="join__quick" onClick={quickHandler}>
          Quick Play
        </button>
        <button className="join__private" onClick={createRoom}>
          Private Room
        </button>
      </div>
    </div>
  );
};
