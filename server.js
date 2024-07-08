const express = require("express");
const mongoose = require("mongoose");
const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');
const helmet = require("helmet");
const path = require("path");
const authRoutes = require("./routes/auth");
const tasksRouter = require('./routes/taskRoute'); // Corrected file name
// const updateExistingUsersWithNewFields = require('./updateUsers'); // Import the update function
const authMiddleware = require('./src/middlewares/authMiddleware'); // Assuming this middleware is in the correct path
const isAdmin = require('./src/middlewares/isAdminMiddleware'); // Assuming this middleware is in the correct path


// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

require("dotenv").config(); // Load environment variables from a .env file if present
const cors = require("cors");


const app = express();
const port = process.env.PORT || 5000; // Use the provided PORT or default to 5000

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies

// Helmet middleware for HTTP headers security
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data: http://localhost:3000; script-src 'self'; style-src 'self' 'https:'");
  next();
});

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "http://localhost:3000"], // Allow images from this source
      styleSrc: ["'self'", "https:"],
      // Add other directives as needed
    },
  })
);

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Log MongoDB connection errors
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Define an async function to start the server after the MongoDB connection is established
async function startServer() {
  // Wait for MongoDB connection to open
  await new Promise((resolve) => db.once("open", resolve));
  console.log("Connected to MongoDB");

// // Call the function to update existing users with new fields
// await updateExistingUsersWithNewFields(); // Await here


  // Mount authentication routes
  app.use("/auth", authRoutes);

  // Mount task routes
  app.use('/tasks', tasksRouter);

  // Example protected route for admins only
app.post('/admin', authMiddleware.authenticateToken, isAdmin, (req, res) => {
  // If the execution reaches here, it means the user is an admin
  res.json({ message: 'Admin route accessed successfully' });
});

  app.use("/uploads/profileimages", express.static(path.join(__dirname, "uploads", "profileimages")));

  // Global error handler middleware
  app.use((err, req, res, next) => {
    console.error("Global error handler:", err);
    res.status(500).json({ error: "Internal Server Error" });
  });

 

  // Start listening on the specified port
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Call the async function to start the server
startServer();
