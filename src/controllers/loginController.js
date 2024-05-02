const bcrypt = require("bcrypt");
const User = require("../models/User");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
      // Compare entered password with stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Send a reduced user object in the response
        const userResponse = {
          _id: user._id,
          username: user.username,
          email: user.email,
          phonenumber: user.phonenumber,
        };

        res.status(200).json({
          message: "Login successful",
          user: userResponse,
        });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } else {
      // Handle case when user is not found
      res.status(401).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
};

module.exports = loginController;
