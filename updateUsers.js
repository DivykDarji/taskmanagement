const User = require("./models/User");

async function updateExistingUsers() {
  try {
    const users = await User.find({});
    for (const user of users) {
      user.isdelete = false; // Set isdelete to false for existing users
      await user.save();
    }
    console.log("Existing users updated successfully");
  } catch (error) {
    console.error("Error updating existing users:", error);
  }
}

module.exports = updateExistingUsers;
