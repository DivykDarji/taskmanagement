// firebase-storage.js
const { getStorage } = require('firebase/storage');
const firebaseApp = require('./firebaseConfig'); // Import the Firebase app instance

const storage = getStorage(firebaseApp); // Initialize Firebase Storage

module.exports = storage; // Export the Firebase Storage instance