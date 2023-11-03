const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../Modal/userModal"); // Import your Mongoose model
const verifyToken = require("../Middleware/authentication");

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all user information
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create a new user
router.post("/", upload.single("photo"), verifyToken, async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    technology: req.body.technology,
    email: req.body.email,
    phone: req.body.phone,
    photo: req.file.buffer ? req.file.buffer : null,
  });

  try {
    const newUser = await user.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update a user's information
router.put("/:id", upload.single("photo"), verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.technology = req.body.technology || user.technology;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    if (req.file) {
      user.photo = req.file.buffer;
    }
    const updatedUser = await user.save();
    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete a user
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await user.deleteOne();

    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
