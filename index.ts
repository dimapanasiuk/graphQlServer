import express from "express";

const passport = require("passport");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./scheme");
const routing = require("./routing");
const { unHandledErrorMiddleware } = require("./middlewares");
const { root }  =require("./scheme/root");

const PORT = 5000;

const app = express();

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

