const TwitterStrategy = require("passport-twitter").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = new TwitterStrategy(
  {
    consumerKey: keys.twitterClientID,
    consumerSecret: keys.twitterClientSecret,
    callbackURL: "/auth/twitter/callback",
    proxy: true,
    includeEmail: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ twitterID: profile.id });
    if (!user) {
      user = await new User({
        twitterID: profile.id,
        email: profile.emails[0].value,
        firstName: profile.displayName,
      }).save();
    }
    done(null, user);
  }
);
