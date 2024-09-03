const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'website-portfolio-react.appspot.com', // Bucket name should be correct
});

const bucket = admin.storage().bucket();

module.exports = bucket;
