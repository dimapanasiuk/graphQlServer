const express = require("express");
const passport = require("passport");
const pas = require("../login");

const router = express.Router();

const User = require("../db/users/scheme");

router.get("/",
  function(req:any, res:any) {
    res.render("home", { user: req.user });
  });

router.get("/login",
  function(req: any, res: any){
    res.render("login");
  });

router.post("/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function(req:any, res:any) {
    res.redirect("/");
  });

router.get("/logout",
  function(req:any, res:any){
    req.logout();
    res.redirect("/");
  });

router.get("/profile",
  require("connect-ensure-login").ensureLoggedIn(),
  function(req:any, res:any){
    res.render("profile", { user: req.user });
  });

router.get("/test",(req:any, res:any)=> {
  const user = new User({
    name: "userName3",
    password: "1234",
    email: "test@ma2il.ru"
  });

  user.save((e: any) => {
    if (e) return res.send({ data: "error" }); // [TODO: check does func go to next / because we have return ]
  });

  res.send("<h1>test</h1>");
});

module.exports = router;
