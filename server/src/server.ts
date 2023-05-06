import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/pass";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "../interfaces/socketInterfases";

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

  socket.on("signIn", (data) => {
    console.log("yep");
  });

  socket.on("signUp", (data) => {
    const { name, email, password } = data;

    User.find({ email: { $eq: email } })
      .then((result: any) => {
        result.length === 0
          ? bcrypt.hash(
              password,
              parseInt(process.env.SALT_ROUND as string),
              async (err, hash) => {
                if (err) {
                  console.error(err);
                  return;
                }

                try {
                  const user = new User({
                    email: email,
                    name: name,
                    password: hash,
                  });

                  await user.save();
                  console.log("Reg is succesfull");
                } catch (err) {
                  console.error(err);
                }
              }
            )
          : socket.emit("alreadyExist", email);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  });
});

server.listen(process.env.SERVER_PORT, () => {
  console.log("Server is running");
});
