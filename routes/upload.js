const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 function from uuid package
const User = require("../models/User");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profileImages');
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, raw) => {
      if (err) return cb(err);
      const filename = `${uuidv4()}${path.extname(file.originalname)}`; // Generate GUID + original extension
      cb(null, filename);
    });
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.profileImage = req.file.filename;
    await user.save();

    res.json({ filename: req.file.filename });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({ error: "Error uploading profile image" });
  }
});

// Serve static files directly using express.static middleware
router.use('/uploads', express.static(path.join(__dirname, '../uploads/profileImages')));

module.exports = router;
