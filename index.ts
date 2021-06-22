import express, { Application } from "express";
import  { graphqlHTTP } from "express-graphql";
const cors = require("cors"); // [TODO:STAS] how to make this with import

const db = require("./db"); // [TODO:STAS] how to make this with import
import schema from "./schemeGraphQl";
const { unHandledErrorMiddleware } = require("./middlewares"); // [TODO:STAS] how to make this with import
import { root } from "./schemeGraphQl/root";

const PORT: number = 5000;

const app: Application = express();

app.use(unHandledErrorMiddleware); //for all endpoints which dosen't have try catch
app.use(cors());
app.use("/graphql", graphqlHTTP(
  {
    graphiql: true,
    schema,
    rootValue: root
  }
));

db.connect.start();

app.use(require("morgan")("combined"));
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("express-session")({ secret: "keyboard cat", resave: false, saveUninitialized: false }));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

