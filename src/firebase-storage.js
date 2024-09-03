const { getStorage } = require('firebase/storage');
const firebaseApp = require('./firebaseConfig'); // Ensure this is correct

const storage = getStorage(firebaseApp);

module.exports = storage;
