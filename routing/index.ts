const express = require("express");
const passport = require("passport");
const pas = require("../login");

const router = express.Router();

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

module.exports = router;
