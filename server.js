const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
// const updateExistingUsersWithIsAdmin = require("./updateUsers");
const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');
const tasksRouter = require('./routes/taskRoute'); // Corrected file name



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Define an async function to wrap the updateExistingUsers call
async function startServer() {
  // Wait for MongoDB connection to open
  await new Promise((resolve) => db.once("open", resolve));
  console.log("Connected to MongoDB");

  // Mount the authRoutes before defining the global error handler
  
  app.use("/auth", authRoutes);
  app.use('/tasks', tasksRouter);
  // Call updateExistingUsers asynchronously
  // await updateExistingUsersWithIsAdmin();
  // // Global error handler middleware
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
