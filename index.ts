import express from "express";
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schemeGraphQl");
const routing = require("./routing");
const { unHandledErrorMiddleware } = require("./middlewares");
const { root }  =require("./scheme/root");

const PORT = 5000;

const app = express();

const {MongoClient} = require("mongodb");
const client  = new MongoClient("mongodb+srv://Dima:Dima1995@cluster0.vqixf.mongodb.net/snDb?retryWrites=true&w=majority");

const start =  async () => {
  try {
    await client.connect();
    console.log("connect is right");
  } catch (e) {
    console.log("=====💡🛑=====",e);
  }
};
start();

app.use(unHandledErrorMiddleware); //for all endpoints which dosen't have try catch
app.use(cors());
app.use("/graphql", graphqlHTTP(
  {
    graphiql: true,
    schema,
    rootValue: root
  }
));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(require("morgan")("combined"));
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("express-session")({ secret: "keyboard cat", resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", routing);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

