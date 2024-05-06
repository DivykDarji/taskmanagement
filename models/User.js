const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phonenumber: String,
  password: { type: String }, // Making password optional
  isdelete: { type: Boolean, default: false },
  authMethod: { type: String } // Add authMethod field to differentiate authentication method
});

const User = mongoose.model("User", userSchema);

module.exports = User;
