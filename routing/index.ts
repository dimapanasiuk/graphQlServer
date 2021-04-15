const express = require("express");
const router = express.Router();

const db = require("../db");

const passport = require("passport");
const Strategy = require("passport-local").Strategy;

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
