// firebase-config.js
const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');// Update this path to the location of your service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://website-portfolio-react.appspot.com', // Replace with your bucket name
});

// Get a reference to the storage bucket
const bucket = admin.storage().bucket();

module.exports = bucket;