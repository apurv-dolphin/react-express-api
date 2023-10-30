const express = require("express");
const router = express.Router();
const User = require("../Modal/userModal"); // Import your Mongoose model

// Get all user information
router.get("/", async (req, res) => {
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
router.post("/", async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    technology: req.body.technology,
    email: req.body.email,
    phone: req.body.phone,
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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
