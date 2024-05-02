const bcrypt = require("bcrypt");
const User = require("../models/User");

const signupController = async (req, res) => {
  try {
    const { username, email, phonenumber, password } = req.body;

    // Validate input
    if (!username || !email || !phonenumber || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Validate password complexity
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    // Hash the entered password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      username,
      email,
      phonenumber,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Send a reduced user object in the response
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      phonenumber: newUser.phonenumber,
    };

    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

module.exports = signupController;
