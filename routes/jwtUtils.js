const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// // Function to generate JWT token
// const generateToken = (payload) => {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
// };
const generateToken = (user) => {
  const payload = {
    id: user._id,
    isAdmin: user.isAdmin,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Function to verify JWT token
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = { generateToken, verifyToken };
