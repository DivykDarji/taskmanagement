const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phonenumber: String,
  password: { type: String }, // Making password optional
  isdelete: { type: Boolean, default: false },
  authMethod: { type: String }, // Add authMethod field to differentiate authentication method
  isAdmin: { type: Boolean, default: false }, // Add isAdmin field to indicate admin status
  tasks: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  profileImage: { type: String, default: '' }, // Add profileImage field to store the path of the profile image
  resetPasswordToken: { type: String, default: null }, // Set default value to null
  resetPasswordExpires: { type: Date, default: null } // Set default value to null
});

const User = mongoose.model("User", userSchema);

module.exports = User;
