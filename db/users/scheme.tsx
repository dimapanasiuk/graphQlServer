import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userScheme = new Schema(
  {
    id: Number,
    username: String,
    password: String,
    email: String,
    todos: Array,
  },
  { versionKey: false }
);

const User = mongoose.model("User", userScheme);

module.exports = User;
