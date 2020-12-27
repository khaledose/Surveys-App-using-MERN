const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ googleID: profile.id });
    if (!user) {
      user = await new User({
        googleID: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
      }).save();
    }
    done(null, user);
  }
);
