const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Access Firestore Database
const db = admin.firestore();

// Assuming you have a User object or data
const userData = {
  username: "example",
  email: "example@example.com",
  phonenumber: "1234567890",
  password: "$2b$10$z0RNnNoARpI8OS5B5UVA1u/1wvSNLD6kXpJkWnNgw3ZwFzmA7K4.a", // Replace with actual hashed password
  isdelete: false
};

// Add document to the "Users" collection
const usersCollectionRef = db.collection("Users");
usersCollectionRef.add(userData)
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
