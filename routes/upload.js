// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require("../config/cloudinary");
// const User = require("../models/User");

// // Configure multer storage to use Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'uploads/profileImages',
//     format: async (req, file) => 'png', // Specify image format
//     public_id: (req, file) => `${Date.now()}_${file.originalname}`, // Unique filename
//     resource_type: "image",
//   },
// });

// const upload = multer({ storage: storage });

// router.post('/', upload.single('profileImage'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const userId = req.user._id;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Save the Cloudinary URL to the user's profileImage field
//     user.profileImage = req.file.path; // Cloudinary URL
//     await user.save();

//     res.json({ url: req.file.path });
//   } catch (error) {
//     console.error("Error uploading profile image:", error);
//     res.status(500).json({ error: "Error uploading profile image" });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { storage } = require('../src/firebase-config'); // Import the storage instance from firebase-config

// const multerStorage = multer.memoryStorage();
// const upload = multer({ storage: multerStorage });

// router.post('/', upload.single('profileImage'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const file = req.file;
//     const blob = storage.bucket().file(`profileImages/${Date.now()}_${file.originalname}`);
//     const blobStream = blob.createWriteStream({
//       metadata: {
//         contentType: file.mimetype,
//       },
//     });

//     blobStream.on('error', (err) => {
//       console.error('Error uploading file:', err);
//       res.status(500).json({ error: 'Error uploading file' });
//     });

//     blobStream.on('finish', async () => {
//       const publicUrl = `https://storage.googleapis.com/${storage.bucket().name}/${blob.name}`;
//       res.json({ url: publicUrl });
//     });

//     blobStream.end(file.buffer);
//   } catch (error) {
//     console.error('Error uploading profile image:', error);
//     res.status(500).json({ error: 'Error uploading profile image' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Storage } = require('@google-cloud/storage'); // Import the Storage class from the Google Cloud library
const path = require('path');

// Initialize Google Cloud Storage
const storage = new Storage({
  keyFilename: path.join(__dirname, '../config/serviceAccountKey.json'), // Path to your service account key
});
const bucket = storage.bucket('website-portfolio-react.appspot.com'); // Use your Firebase Storage bucket name

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

router.post('/', upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const blob = bucket.file(`profileImages/${Date.now()}_${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      console.error('Error uploading file:', err);
      res.status(500).json({ error: 'Error uploading file' });
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      req.file.url = publicUrl; // Set the URL in req.file
      res.json({ url: publicUrl });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ error: 'Error uploading profile image' });
  }
});

module.exports = router;

