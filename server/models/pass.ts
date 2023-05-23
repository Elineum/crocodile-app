import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    regDate: {
      type: Number,
    },
    isMember: {
      type: Boolean,
      required: true,
    },
  },
  { collection: process.env.DB_COLLECTION_BRANCH }
);

export const User = mongoose.model("User", userSchema);
