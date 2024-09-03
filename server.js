// const express = require("express");
// const mongoose = require("mongoose");
// const helmet = require("helmet");
// const authRoutes = require("./routes/auth");
// const tasksRouter = require('./routes/taskRoute');
// const authMiddleware = require('./src/middlewares/authMiddleware');
// const isAdmin = require('./src/middlewares/isAdminMiddleware');
// const cors = require("cors");

// require("dotenv").config(); // Load environment variables from a .env file if present

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data: https://taskmanagement-inky.vercel.app; script-src 'self'; style-src 'self' 'https:'");
//   next();
// });

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'"],
//       imgSrc: ["'self'", "data:", "https://taskmanagement-inky.vercel.app"],
//       styleSrc: ["'self'", "https:"],
//     },
//   })
// );

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on("error", (err) => {
//   console.error("MongoDB connection error:", err);
// });

// async function startServer() {
//   await new Promise((resolve) => db.once("open", resolve));
//   console.log("Connected to MongoDB");

//   app.use("/auth", authRoutes);
//   app.use('/tasks', tasksRouter);

//   app.post('/admin/dashboard', authMiddleware.authenticateToken, isAdmin, (req, res) => {
//     res.json({ message: 'Admin route accessed successfully' });
//   });

//   app.use((err, req, res, next) => {
//     console.error("Global error handler:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   });

//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// }

// startServer();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const authRoutes = require("./routes/auth");
const tasksRouter = require('./routes/taskRoute');
const authMiddleware = require('./src/middlewares/authMiddleware');
const isAdmin = require('./src/middlewares/isAdminMiddleware');
const cors = require("cors");

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

  app.use((err, req, res, next) => {
    console.error("Global error handler:", err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();