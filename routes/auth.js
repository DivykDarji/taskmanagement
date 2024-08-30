const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose");
const jwtUtils = require("./jwtUtils");
const jwt = require('jsonwebtoken');
// const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const firebaseApp = require("../src/firebaseConfig");
const { getAuth } = require("firebase/auth");
const auth = getAuth(firebaseApp);
const path = require("path");
// Import multer and other required modules for file uploads
const multer = require("multer");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env file

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profileImages");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, raw) => {
      if (err) return cb(err);
      const filename = `${uuidv4()}${path.extname(file.originalname)}`; // Generate GUID + original extension
      cb(null, filename);
    });
  },
});

const upload = multer({ storage: storage });

// Email configuration

// Email configuration
// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER, // Use environment variable
//     pass: process.env.EMAIL_PASS, // Use environment variable
//   },
// });

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525, // Make sure to use the correct port for Mailtrap
  secure: false, // Set to true if your Mailtrap server requires SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send-email", async (req, res) => {
  try {
    const { email, name } = req.body;

    const mailOptions = {
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Support Request Received",
      html: `
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to us. We have received your support request and will get back to you shortly.</p>
            <p>Best regards,</p>
            <p>Support Team</p>
        `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send(`Error sending email: ${error.message}`);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, username, phonenumber, password, authMethod, isAdmin } =
      req.body;

    // Validate input
    if (!email || !username || !phonenumber || !password || !authMethod) {
      return res.status(400).json({
        error:
          "Email, username, phonenumber, password, and authMethod are required",
      });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Save user data based on authMethod
    let newUser;
    if (authMethod === "traditional") {
      const hashedPassword = await bcrypt.hash(password, 10);
      newUser = new User({
        email,
        username,
        phonenumber,
        password: hashedPassword,
        isdelete: false,
        authMethod: "traditional",
        isAdmin: false, // Default to false if isAdmin is not provided
      });
    } else if (authMethod === "firebase") {
      newUser = new User({
        email,
        isdelete: false,
        authMethod: "firebase",
        isAdmin: false, // Default to false if isAdmin is not provided
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
        // Generate JWT token
        const token = jwtUtils.generateToken({ email: user.email });
        // Send a reduced user object in the response
        const userResponse = {
          _id: user._id,
          username: user.username,
          email: user.email,
          phonenumber: user.phonenumber,
          isAdmin: user.isAdmin, // Include isAdmin status
        };

        res.status(200).json({
          message: "Login successful",
          user: userResponse,
          token: token, // Send token in response
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


router.post("/forgot-password", async (req, res) => {
  console.log("Received forgot password request:", req.body); // Log incoming request body

  const { email } = req.body;
  if (!email) {
    console.log("Email is required"); // Log error message
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email); // Log error message
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a token
    const token = crypto.randomBytes(20).toString("hex");

    // Set token and expiration time (10min hour from now)
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 600000; // 10min

    await user.save();

    // Send email with reset link
    const resetUrl = `https://taskmanagement-inky.vercel.app/reset-password/${token}`;
    const mailOptions = {
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>Dear ${user.username},</p>
        <p>You requested a password reset. Please click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 10 minutes.</p>
        <p>Best regards,</p>
        <p>Support Team</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Log success message
    console.log("Password reset link sent to:", user.email);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error processing forgot password request:", error);

    // Log the error
    console.error(error);

    // Send generic error response to the client
    res.status(500).json({ error: "Error processing forgot password request" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  console.log("Received reset password request:", req.params); // Log token from request parameters
  console.log("Received reset password request body:", req.body); // Log incoming request body

  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log("Password reset token is invalid or has expired:", token); // Log error message
      return res
        .status(400)
        .json({ error: "Password reset token is invalid or has expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Error resetting password" });
  }
});


router.get("/validate-token/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Password reset token is invalid or has expired" });
    }

    res.status(200).json({ message: "Token is valid" });
  } catch (error) {
    console.error("Error validating token:", error);
    res.status(500).json({ error: "Error validating token" });
  }
});


// Update password route handler
router.put("/users/:id/password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare current password with stored hashed password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect current password" });
    }

    // Validate strength of the new password
    if (newPassword.length < 8) {
      return res.status(400).json({ error: "New password must be at least 8 characters long" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;

    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Error updating password" });
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
// Get user count
router.get('/count', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.json({ userCount });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).json({ message: 'Failed to fetch user count', error: error.message });
  }
});

// Fetch all users without sensitive information
router.get("/users", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = { isdelete: false };

    // Check if search query is provided
    if (req.query.search) {
      // Use $or operator to search by username or email
      query.$or = [
        { username: { $regex: req.query.search, $options: "i" } }, // Case-insensitive search for username
        { email: { $regex: req.query.search, $options: "i" } }, // Case-insensitive search for email
      ];
    }

    const users = await User.find(query, "-password").skip(skip).limit(limit);

    const totalCount = await User.countDocuments(query);
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
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      phonenumber,
      password: hashedPassword,
      isAdmin: false, // Default isAdmin to false for new users
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phonenumber: newUser.phonenumber,
        isAdmin: newUser.isAdmin, // Include isAdmin in the response
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Update user route handler
router.put("/users/:id", upload.single("profileImage"), async (req, res) => {
  try {
    const { username, email, phonenumber, password, isAdmin } = req.body;
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields if they exist in the request body
    user.username = username || user.username;
    user.email = email || user.email;
    user.phonenumber = phonenumber || user.phonenumber;
    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

    // Update password only if it's provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Update profile image if it's uploaded
    if (req.file) {
      user.profileImage = req.file.filename;
    }

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
});

router.post('/google-login', async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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

// Serve static files directly using express.static middleware
router.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads/profileImages"))
);


module.exports = router;


