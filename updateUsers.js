const User = require("./models/User");

async function updateExistingUsersWithNewFields() {
  try {
    // Update all documents where resetPasswordToken is null or undefined
    await User.updateMany(
      { resetPasswordToken: { $in: [null, undefined] } },
      { $set: { resetPasswordToken: null } }
    );

    // Update all documents where resetPasswordExpires is null or undefined
    await User.updateMany(
      { resetPasswordExpires: { $in: [null, undefined] } },
      { $set: { resetPasswordExpires: null } }
    );

    console.log("Existing users updated successfully with new fields");
  } catch (error) {
    console.error("Error updating existing users with new fields:", error);
  }
}

module.exports = updateExistingUsersWithNewFields;
