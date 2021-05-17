const { MongoClient } = require("mongodb");
const client  = new MongoClient("mongodb+srv://Dima:Dima1995@cluster0.vqixf.mongodb.net/snDb?retryWrites=true&w=majority");

exports.start =  async () => {
  try {
    await client.connect();
    console.log("connect is right");
  } catch (e) {
    console.log("=====💡🛑=====",e);
  }
};
