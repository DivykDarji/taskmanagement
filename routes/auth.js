const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose"); // Import mongoose
const router = express.Router();
const firebaseApp = require('../src/firebaseConfig');
const { getAuth } = require('firebase/auth'); // Keep using CommonJS require syntax
const auth = getAuth(firebaseApp);

router.post("/signup", async (req, res) => {
  try {
    const { email, username, phonenumber, password, authMethod } = req.body;

    // Validate input
    if (!email || !username || !phonenumber || !password || !authMethod) {
      return res.status(400).json({ error: "Email, username, phonenumber, password, and authMethod are required" });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Save user data based on authMethod
    let newUser;
    if (authMethod === 'traditional') {
      const hashedPassword = await bcrypt.hash(password, 10);
      newUser = new User({
        email,
        username,
        phonenumber,
        password: hashedPassword,
        isdelete: false,
        authMethod: 'traditional',
      });
    } else if (authMethod === 'firebase') {
      newUser = new User({
        email,
        isdelete: false,
        authMethod: 'firebase',
      });
    } else {
      return res.status(400).json({ error: "Invalid authMethod" });
    }

    await newUser.save();

    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Error signing up" });
  }
});



// Login (POST)
router.post("/login", async (req, res) => {
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
});
router.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
      // Email exists
      res.status(200).json({
        exists: true,
        message: "Email exists",
      });
    } else {
      // Email does not exist
      res.status(404).json({
        exists: false,
        message: "Email does not exist",
      });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: "Error checking email" });
  }
});

// Import the User model

// Fetch all users without sensitive information
router.get("/users", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({ isdelete: false }, "-password")
                             .skip(skip)
                             .limit(limit);

    const totalCount = await User.countDocuments({ isdelete: false });
    const totalPages = Math.ceil(totalCount / limit);

    res.json({ users, totalPages });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});



// Fetch a single user by ID and mark it as deleted
// Fetch a single user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Error fetching user by ID" });
  }
});




router.post("/users", async (req, res) => {
  try {
    const { username, email, phonenumber, password } = req.body;
    if (!username || !email || !phonenumber || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      phonenumber,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phonenumber: newUser.phonenumber,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { username, email, phonenumber, password } = req.body;
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Update fields if they exist in the request body
    user.username = username || user.username;
    user.email = email || user.email;
    user.phonenumber = phonenumber || user.phonenumber;
    // Update password only if it's provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
});


router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.isdelete = true; 
    await user.save();
    res.json({ message: "User marked as deleted", user });
  } catch (error) {
    console.error("Error marking user as deleted:", error);
    res.status(500).json({ error: "Error marking user as deleted" });
  }
});

module.exports = router;

// const express = require("express");
// const bcrypt = require("bcrypt");
// const User = require("../models/User");
// const loginController = require("./controllers/loginController"); // Corrected import path
// const signupController = require("./controllers/signupController"); // Corrected import path
// const userController = require("./controllers/userController"); // Corrected import path

// const router = express.Router();

// // Signup route handler
// router.post("/signup", signupController);

// // Login route handler
// router.post("/login", loginController);

// // Check email route handler
// router.post("/check-email", async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Validate input
//     if (!email) {
//       return res.status(400).json({ error: "Email is required" });
//     }

//     // Find the user by email
//     const user = await User.findOne({ email });

//     if (user) {
//       // Email exists
//       res.status(200).json({
//         exists: true,
//         message: "Email exists",
//       });
//     } else {
//       // Email does not exist
//       res.status(404).json({
//         exists: false,
//         message: "Email does not exist",
//       });
//     }
//   } catch (error) {
//     console.error("Error checking email:", error);
//     res.status(500).json({ error: "Error checking email" });
//   }
// });

// // Fetch all users route handler
// router.get("/users", userController.getAllUsers);

// // Fetch a single user by ID route handler
// router.get("/users/:id", userController.getUserById);

// // Create new user route handler
// router.post("/users", userController.createUser);

// // Update user route handler
// router.put("/users/:id", userController.updateUser);

// // Mark user as deleted route handler
// router.delete("/users/:id", userController.deleteUser);

// module.exports = router;
