import { User } from "../../models/pass";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const registrationHandler = (formData: any, socket: any) => {
  const { email, password } = formData;

  User.find({ email })
    .then((result: any) => {
      const isMailExist = result.length !== 0;

      isMailExist
        ? socket.emit("alreadyExist", email)
        : bcrypt.hash(
            password,
            parseInt(process.env.SALT_ROUND as string),
            async (err, hash) => {
              if (err) {
                console.error(err);
                return;
              }

              try {
                const user = new User({
                  nickname: "",
                  email: email,
                  password: hash,
                  regDate: Date.now(),
                  isMember: true,
                });

                await user.save();

                console.log("Reg is succesfull");
              } catch (err) {
                console.error(err);
              }
            }
          );
    })
    .catch((error: Error) => {
      console.error(error);
    });
};
