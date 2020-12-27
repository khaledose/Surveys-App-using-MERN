const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  facebookID: String,
  twitterID: String,
  email: String,
  firstName: String,
  lastName: String,
});

mongoose.model("users", userSchema);
