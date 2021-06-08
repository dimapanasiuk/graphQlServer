import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userScheme = new Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  { versionKey: false }
);

const User = mongoose.model("User", userScheme);

module.exports = User;
