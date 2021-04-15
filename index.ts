import express from "express";

const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const db = require("./db");

const { graphqlHTTP } = require("express-graphql");
const schema = require("./scheme");
const cors = require("cors");

const PORT = 5000;

const basicStr = "Node TS app!";

const users: any[] = [{ id: 1, username: "Masonovv", age: 25 }];

const createUser = (input: any) => {
  const id: number = Date.now();
  return { id, ...input };
};

const root = {
  getAllUsers: () => users,
  getUser: ({ id }: any): any => {
    return users.find(user => user.id === id);
  },
  createUser: ({ input }: any) => {
    const user = createUser(input);
    users.push(user);
    return user;
  }
};


passport.use(new Strategy(
  function(username:any, password:any, cb:any) {
    db.users.findByUsername(username, function(err:any, user:any) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user:any, cb:any) {
  cb(null, user.id);
});

passport.deserializeUser(function(id:any, cb:any) {
  db.users.findById(id, function (err:any, user:any) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

const app = express();
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


app.get("/",
  function(req:any, res:any) {
    res.render("home", { user: req.user });
  });

app.get("/login",
  function(req, res){
    res.render("login");
  });

app.post("/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function(req:any, res:any) {
    res.redirect("/");
  });

app.get("/logout",
  function(req:any, res:any){
    req.logout();
    res.redirect("/");
  });

app.get("/profile",
  require("connect-ensure-login").ensureLoggedIn(),
  function(req:any, res:any){
    res.render("profile", { user: req.user });
  });

app.get("/grapgh", (req, res) => {
  res.send(basicStr);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

