const User= require('../models/User')
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  // Validation: Check for missing fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create the user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
  
      // If user not found or password doesn't match
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // If successful, send user data and token
      res.status(200).json({
        id: user._id,
        user,
        token: generateToken(user._id),
      });
    } catch (err) {
      res.status(500).json({ message: "Error logging in user", error: err.message });
    }
  };
  

// Get User Info
exports.getUserInfo = async (req, res) => {
    try {
      // Find the user by ID (req.user.id comes from the token after authentication)
      const user = await User.findById(req.user.id).select("-password"); // Exclude password field
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // If user found, send user info
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Error fetching user info", error: err.message });
    }
  };
  