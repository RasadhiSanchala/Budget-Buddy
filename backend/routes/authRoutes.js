const express = require("express");
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); 
const cloudinary = require("../config/cloudinary");
const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to login an existing user
router.post("/login", loginUser);

// Route to get user information (only if authenticated)
router.get("/getUser", protect, getUserInfo);

// Route to upload an image
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "budget-buddy/profile-images",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file.buffer);
      });
    };

    const result = await uploadToCloudinary();

    res.status(200).json({
      imageUrl: result.secure_url,
    });

  } catch (error) {
    console.error("Cloudinary upload error:", error);

    res.status(500).json({
      message: "Image upload failed",
    });
  }
});

module.exports = router;
