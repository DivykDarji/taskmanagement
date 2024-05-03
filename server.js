const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const updateExistingUsers = require("./updateUsers");

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

db.once("open", () => {
  console.log("Connected to MongoDB");

  // Mount the authRoutes after connecting to MongoDB
  app.use("/auth", authRoutes);
});
updateExistingUsers();
// Global error handler middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// const express = require("express");
// const mongoose = require("mongoose");
// const authRoutes = require("./routes/auth");
// const errorHandler = require("./middleware/errorHandler");
// require("dotenv").config();
// const cors = require("cors");

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on("error", (err) => {
//   console.error("MongoDB connection error:", err);
// });

// db.once("open", () => {
//   console.log("Connected to MongoDB");

//   // Mount the authRoutes after connecting to MongoDB
//   app.use("/auth", authRoutes);
// });

// app.use((err, req, res, next) => {
//   console.error("Global error handler:", err);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
