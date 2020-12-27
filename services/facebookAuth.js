const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = new FacebookStrategy(
  {
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: "/auth/facebook/callback",
    proxy: true,
    profileFields: ["id", "emails", "name"],
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ facebookID: profile.id });
    if (!user) {
      user = await new User({
        facebookID: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
      }).save();
    }
    done(null, user);
  }
);
