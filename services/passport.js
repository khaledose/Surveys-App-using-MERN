const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const googleAuth = require("./googleAuth");
const facebookAuth = require("./facebookAuth");
const twitterAuth = require("./twitterAuth");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(googleAuth);

passport.use(facebookAuth);

passport.use(twitterAuth);
