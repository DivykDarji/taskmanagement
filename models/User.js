const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phonenumber: String,
  password: { type: String, required: true, minlength: 60 }, 
});

const User = mongoose.model("User", userSchema);

module.exports = User;
