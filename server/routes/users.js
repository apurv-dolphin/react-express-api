// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../config"); // Import Firestore db and User collection

// Get all users
router.get("/users", async (req, res) => {
  try {
    const snapshot = await User.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const data = req.body;
    await User.add(data);
    res.json({ msg: "User Added Successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Update user by ID
router.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await User.doc(id).set(data, { merge: true });
    res.json({ msg: "User Updated Successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// Delete user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.doc(id).delete();
    res.json({ msg: "User Deleted Successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
