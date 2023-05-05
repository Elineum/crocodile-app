import { useState, FormEventHandler } from "react";
import { Socket } from "socket.io-client";
import "./Room.scss";

interface RoomProps {
  socket: Socket;
}

export const Room = ({ socket }: RoomProps) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([{ name: "", text: "" }]);

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", inputValue);
    setInputValue("");
  };

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  socket.on("response", (data) => {
    setMessages(data);
  });

  return (
    <div className="room">
      <div className="room__canvas"></div>
      <div className="room__users-info">
        <div className="room__users"></div>
        <div className="room__chat">
          <ul className="room__chat-list">
            {messages.map((item, index) => (
              <li className="room__chat-item" key={index}>
                {item.name}: {item.text}
              </li>
            ))}
          </ul>
        </div>
        <form className="room__form" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter text..."
            className="room__input"
            value={inputValue}
            onChange={changeHandler}
            required
          />
          <button type="submit" className="room__button">
            +
          </button>
        </form>
      </div>
    </div>
  );
};
