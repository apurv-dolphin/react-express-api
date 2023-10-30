// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../config"); // Import Firestore db and User collection

// Get all users
router.get("/api/users", async (req, res) => {
  try {
    const snapshot = await User.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Create a new user
router.post("/api/users", async (req, res) => {
  try {
    const data = req.body;
    await User.add(data);
    res.json({ msg: "User Added Successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Update user by ID
router.put("/api/users/:id", async (req, res) => {
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
router.delete("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userDoc = await User.doc(id).get();

    if (userDoc.exists) {
      // Document exists, proceed with deletion
      await User.doc(id).delete();
      res.json({ msg: "User Deleted Successfully." });
    } else {
      // Document doesn't exist, respond with an error
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
