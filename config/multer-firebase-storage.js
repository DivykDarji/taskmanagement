const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
  keyFilename: path.join(__dirname, '../config/serviceAccountKey.json'),
});
const bucket = storage.bucket('website-portfolio-react.appspot.com');

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

const uploadToFirebase = async (req, res, next) => {
  if (!req.file) {
    return next(); // Proceed if no file is uploaded
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
    req.file.firebaseUrl = publicUrl; // Set the URL in req.file
    next(); // Proceed to the next middleware
  });

  blobStream.end(file.buffer);
};

module.exports = {
  upload,
  uploadToFirebase,
};
