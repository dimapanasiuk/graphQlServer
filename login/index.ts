const db = require("../db");
const pas = require("passport");
const Strategy = require("passport-local").Strategy;

pas.use(new Strategy(
  function(username:any, password:any, cb:any) {
    db.users.findByUsername(username, function(err:any, user:any) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

pas.serializeUser(function(user:any, cb:any) {
  cb(null, user.id);
});

pas.deserializeUser(function(id:any, cb:any) {
  db.users.findById(id, function (err:any, user:any) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

export default pas;
