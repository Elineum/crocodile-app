import { Route, Routes, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "./interfaces/socketInterfases";
import { useEffect, useState } from "react";
import { Authentication } from "./components/Authentication/Authentication";
import { Join } from "./components/Join/Join";
import { Room } from "./components/Room/Room";
import shortid from "shortid";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:5000"
);

const localeStorage = window.localStorage;
const logMail = localeStorage.getItem("crocoUser");

function App() {
  const [localeData, setLocaleData] = useState<string | null>(logMail);
  const navigate = useNavigate();

  useEffect(() => {
    const logHendler = (data: any) => {
      localeStorage.setItem("crocoUser", data);
      setLocaleData(data);
    };

    socket.on("login", logHendler);

    return () => {
      socket.off("login", logHendler);
    };
  }, []);

  const createRoom = () => {
    const newRoomId = shortid.generate();
    navigate(`./${newRoomId}`);
  };

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            localeData ? (
              <Join socket={socket} createRoom={createRoom} />
            ) : (
              <Authentication socket={socket} />
            )
          }
        />
        <Route path="/:roomId" element={<Room socket={socket} />} />
      </Routes>
    </main>
  );
}

export default App;
