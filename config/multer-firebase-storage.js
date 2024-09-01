// config/multer-firebase-storage.js
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
const bucketName = 'website-portfolio-react.appspot.com'; // Replace with your Firebase Storage bucket name

// Initialize Google Cloud Storage
const storage = new Storage();
const bucket = storage.bucket(bucketName);

const multerFirebaseStorage = Multer.memoryStorage(); // Store file in memory

const upload = Multer({
  storage: multerFirebaseStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
});

const uploadToFirebase = (req, res, next) => {
  if (!req.file) return next();

  const file = bucket.file(`profileImages/${Date.now()}-${req.file.originalname}`);
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (err) => {
    console.error('Firebase upload error:', err);
    return res.status(500).json({ error: 'Error uploading file' });
  });

  stream.on('finish', () => {
    file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 3600 * 1000, // URL expires in 1 hour
    }, (err, url) => {
      if (err) {
        console.error('Error getting signed URL:', err);
        return res.status(500).json({ error: 'Error getting signed URL' });
      }

      req.file.firebaseUrl = url;
      next();
    });
  });

  stream.end(req.file.buffer);
};

module.exports = { upload, uploadToFirebase };
