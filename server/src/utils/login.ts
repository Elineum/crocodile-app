import { User } from "../../models/pass";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const loginHandler = (formData: any, socket: any) => {
  const { email, password } = formData;

  User.findOne({ email })
    .then((user: any) => {
      if (!user) {
        console.error("User not found");

        return;
      }

      return bcrypt.compare(password, user.password);
    })
    .then((result) => {
      if (result) {
        socket.emit("login", email);
      } else {
        console.error("Invalid Password");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
