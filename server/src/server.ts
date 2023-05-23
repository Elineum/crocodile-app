import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "../interfaces/socketInterfases";
import { registrationHandler } from "./utils/registration";
import { loginHandler } from "./utils/login";

dotenv.config();

const db = `mongodb+srv://${process.env.DB_ACCESS_NAME}:${process.env.DB_ACCESS_PASS}@${process.env.DB_NAME}.pestswt.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`;
mongoose
  .connect(db)
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const server = http.createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    console.log(data);
  });

  socket.on("signIn", (formData) => {
    loginHandler(formData, socket);
  });

  socket.on("signUp", (formInfo) => {
    registrationHandler(formInfo, socket);
  });
});

server.listen(process.env.SERVER_PORT, () => {
  console.log("Server is running");
});
