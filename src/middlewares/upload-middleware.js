// const multer = require('multer');
// const bucket = require('./config/firebase-config'); // Import bucket from unified config

// const multerStorage = multer.memoryStorage();
// const upload = multer({ storage: multerStorage });

// const uploadToFirebase = async (req, res, next) => {
//   if (!req.file) {
//     return next(); // Proceed if no file is uploaded
//   }

//   const file = req.file;
//   const blob = bucket.file(`profileImages/${Date.now()}_${file.originalname}`);
//   const blobStream = blob.createWriteStream({
//     metadata: {
//       contentType: file.mimetype,
//     },
//   });

//   blobStream.on('error', (err) => {
//     console.error('Error uploading file:', err);
//     return res.status(500).json({ error: 'Error uploading file' });
//   });

//   blobStream.on('finish', async () => {
//     const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//     req.file.firebaseUrl = publicUrl; // Attach URL to req.file
//     next(); // Proceed to the next middleware or route handler
//   });

//   blobStream.end(file.buffer);
// };

// module.exports = {
//   upload,
//   uploadToFirebase,
// };
