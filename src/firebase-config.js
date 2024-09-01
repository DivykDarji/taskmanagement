const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json'); // Path to your Firebase Admin SDK key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'website-portfolio-react.appspot.com', // Your Firebase Storage bucket
});

const auth = admin.auth();
const storage = admin.storage().bucket();

module.exports = { auth, storage }