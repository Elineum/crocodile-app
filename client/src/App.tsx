import { Join } from "./components/Join/Join";
import { Room } from "./components/Room/Room";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "./interfaces/socketInterfases";
import { Authentication } from "./components/Authentication/Authentication";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:5000"
);

function App() {
  return (
    <div>
      {/* <Join socket={socket} />
      <Room socket={socket} /> */}
      <Authentication socket={socket} />
    </div>
  );
}

export default App;
