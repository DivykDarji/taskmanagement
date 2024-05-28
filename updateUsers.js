
const User = require("./models/User");
const Task = require("./models/task"); // Assuming you have a Task model defined


async function updateExistingUsersWithIsAdmin() {
    try {
        // Find all existing users
        const users = await User.find({});

        // Iterate over each user and update properties
        for (const user of users) {
            // Add isAdmin field if it doesn't already exist
            if (!user.hasOwnProperty('isAdmin')) {
                user.isAdmin = false; // Set default value to false
                await user.save(); // Save the updated user
            }
        }

        console.log("Existing users updated with isAdmin field successfully");
    } catch (error) {
        console.error("Error updating existing users with isAdmin field:", error);
    }
}

module.exports = updateExistingUsersWithIsAdmin;
