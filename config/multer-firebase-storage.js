// config/multer-firebase-storage.js
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
const path = require('path');

// Replace with your Firebase Storage bucket name
const bucketName = 'gs://website-portfolio-react.appspot.com';

// Initialize Google Cloud Storage
const storage = new Storage();
const bucket = storage.bucket(bucketName);

// Use memory storage in Multer to keep the file in memory before uploading
const multerFirebaseStorage = Multer.memoryStorage();

const upload = Multer({
  storage: multerFirebaseStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB file size limit
});

// Middleware to upload file to Firebase Storage
const uploadToFirebase = (req, res, next) => {
  if (!req.file) return next();

  const fileName = `profileImages/${Date.now()}-${path.basename(req.file.originalname)}`;
  const file = bucket.file(fileName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (err) => {
    console.error('Firebase upload error:', err);
    return res.status(500).json({ error: 'Error uploading file' });
  });

  stream.on('finish', async () => {
    try {
      // Get the public URL for the file
      const url = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      req.file.firebaseUrl = url;
      next();
    } catch (err) {
      console.error('Error getting file URL:', err);
      return res.status(500).json({ error: 'Error getting file URL' });
    }
  });

  stream.end(req.file.buffer);
};

module.exports = { upload, uploadToFirebase };
