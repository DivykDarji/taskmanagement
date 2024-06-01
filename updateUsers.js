const User = require("./models/User"); // Import the User model

async function updateExistingUsersWithProfileImage() {
    try {
        // Find all existing users
        const users = await User.find({});

        // Iterate over each user and update properties
        for (const user of users) {
            // Add profileImage field if it doesn't already exist
            if (!user.hasOwnProperty('profileImage')) {
                user.profileImage = ''; // Set default value to an empty string
                await user.save(); // Save the updated user
            }
        }

        console.log("Existing users updated successfully with profileImage field");
    } catch (error) {
        console.error("Error updating existing users with profileImage field:", error);
    }
}

module.exports = updateExistingUsersWithProfileImage;
// Call updateExistingUsers asynchronously
  // await updateExistingUsersWithProfileImage();
  
