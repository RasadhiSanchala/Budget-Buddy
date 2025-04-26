const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect middleware
exports.protect = async (req, res, next) => {
  let token;

  // Get token from header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password'); // exclude password

    next(); // Go to next middleware / controller
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
