
exports.start = async() : Promise<void> => {
  const url  = "mongodb+srv://Dima:Dima1995@cluster0.nvpuu.mongodb.net/users?retryWrites=true&w=majority";

  const mongoose = require("mongoose");

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("db connect");
  } catch (e) {
    console.log("server error", e.message);
    process.exit(1);
  }
};
