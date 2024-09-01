// const express = require("express");
// const mongoose = require("mongoose");
// const admin = require('firebase-admin');
// const serviceAccount = require('./config/serviceAccountKey.json');
// const helmet = require("helmet");
// const path = require("path");
// const authRoutes = require("./routes/auth");
// const tasksRouter = require('./routes/taskRoute'); // Corrected file name
// // const updateExistingUsersWithNewFields = require('./updateUsers'); // Import the update function
// const authMiddleware = require('./src/middlewares/authMiddleware'); // Assuming this middleware is in the correct path
// const isAdmin = require('./src/middlewares/isAdminMiddleware'); // Assuming this middleware is in the correct path


// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// require("dotenv").config(); // Load environment variables from a .env file if present
// const cors = require("cors");


// const app = express();
// const port = process.env.PORT || 5000; // Use the provided PORT or default to 5000

// app.use(cors()); // Enable Cross-Origin Resource Sharing
// app.use(express.json()); // Parse JSON bodies

// // Helmet middleware for HTTP headers security
// app.use((req, res, next) => {
//   res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data: http://localhost:3000; script-src 'self'; style-src 'self' 'https:'");
//   next();
// });

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'"],
//       imgSrc: ["'self'", "data:", "http://localhost:3000"], // Allow images from this source
//       styleSrc: ["'self'", "https:"],
//       // Add other directives as needed
//     },
//   })
// );

// // Connect to MongoDB using Mongoose
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// // Log MongoDB connection errors
// db.on("error", (err) => {
//   console.error("MongoDB connection error:", err);
// });

// // Define an async function to start the server after the MongoDB connection is established
// async function startServer() {
//   // Wait for MongoDB connection to open
//   await new Promise((resolve) => db.once("open", resolve));
//   console.log("Connected to MongoDB");

// // // Call the function to update existing users with new fields
// // await updateExistingUsersWithNewFields(); // Await here


//   // Mount authentication routes
//   app.use("/auth", authRoutes);

//   // Mount task routes
//   app.use('/tasks', tasksRouter);

//   // Example protected route for admins only
//   app.post('/admin/dashboard', authMiddleware.authenticateToken, isAdmin, (req, res) => {
//     // If the execution reaches here, it means the user is an admin
//     res.json({ message: 'Admin route accessed successfully' });
//   });

//   app.use("/uploads/profileimages", express.static(path.join(__dirname, "uploads", "profileimages")));

//   // Global error handler middleware
//   app.use((err, req, res, next) => {
//     console.error("Global error handler:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   });

 

//   // Start listening on the specified port
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// }

// // Call the async function to start the server
// startServer();



const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
// const path = require("path");
const User = require('./models/User');
const bcrypt = require('bcrypt');
const authRoutes = require("./routes/auth");
const tasksRouter = require('./routes/taskRoute'); 
const authMiddleware = require('./src/middlewares/authMiddleware');
const isAdmin = require('./src/middlewares/isAdminMiddleware');
const cors = require("cors");
const { upload, uploadToFirebase } = require('./config/multer-firebase-storage'); // Import your custom multer storage

require("dotenv").config(); // Load environment variables from a .env file if present

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data: http://localhost:3000; script-src 'self'; style-src 'self' 'https:'");
  next();
});

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "http://localhost:3000"],
      styleSrc: ["'self'", "https:"],
    },
  })
);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

async function startServer() {
  await new Promise((resolve) => db.once("open", resolve));
  console.log("Connected to MongoDB");

  app.use("/auth", authRoutes);

  app.use('/tasks', tasksRouter);

  app.post('/admin/dashboard', authMiddleware.authenticateToken, isAdmin, (req, res) => {
    res.json({ message: 'Admin route accessed successfully' });
  });

  app.put('/users/:id', upload.single('profileImage'), uploadToFirebase, async (req, res) => {
    try {
      const { username, email, phonenumber, password, isAdmin } = req.body;
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update fields if they exist in the request body
      user.username = username || user.username;
      user.email = email || user.email;
      user.phonenumber = phonenumber || user.phonenumber;
      user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

      // Update password only if it's provided
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      // Update profile image if it's uploaded
      if (req.file && req.file.firebaseUrl) {
        user.profileImage = req.file.firebaseUrl; // Firebase Storage URL
      }

      await user.save();
      res.json({ message: "User updated successfully", user });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user" });
    }
  });

  app.use((err, req, res, next) => {
    console.error("Global error handler:", err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
