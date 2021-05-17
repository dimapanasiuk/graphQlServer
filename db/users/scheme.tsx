const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const Schema = mongoose.Schema;

const userScheme = new Schema(
  {
    userName: String,
    password: Array,
    email: String,
  },
  { versionKey: false }
);

const User = mongoose.model("User", userScheme);

module.exports = User;
