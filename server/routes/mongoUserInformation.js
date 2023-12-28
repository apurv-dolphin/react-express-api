const express = require("express");
const router = express.Router();
const fs = require("fs");
const User = require("../Modal/userModal"); // Import your Mongoose model
const verifyToken = require("../Middleware/authentication");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const fileUpload = require("express-fileupload");
require("dotenv").config();

router.use(bodyParser.json());

router.use(fileUpload());

const username = process.env.USEREMAIL;
const password = process.env.PASSWORD;

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
router.post("/", verifyToken, async (req, res) => {
  try {
    const { firstname, lastname, technology, email, phone } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const photo = req.files.photoUrl;
    const photoUrl = `/uploads/${Date.now()}_${photo.name}`;

    // Ensure that the 'public/uploads' directory exists
    const uploadsDirectory = "./public/uploads";
    if (!fs.existsSync(uploadsDirectory)) {
      fs.mkdirSync(uploadsDirectory, { recursive: true });
    }

    await photo.mv(`./public${photoUrl}`);

    const newUser = new User({
      firstname,
      lastname,
      technology,
      email,
      phone,
      photoUrl,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: savedUser,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update user Info
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update user fields
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.technology = req.body.technology || user.technology;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    // Ensure that the 'public/uploads' directory exists
    const uploadsDirectory = "./public/uploads";
    if (!fs.existsSync(uploadsDirectory)) {
      fs.mkdirSync(uploadsDirectory, { recursive: true });
    }

    // Handle photo update if provided
    if (req.files && req.files.photoUrl) {
      // Delete the old image if it exists
      if (user.photoUrl) {
        const oldImagePath = `./public${user.photoUrl}`;
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Assuming req.files.photoUrl contains the relative path of the new image
      const photo = req.files.photoUrl;
      const photoUrl = `/uploads/${Date.now()}_${photo.name}`;
      user.photoUrl = photoUrl;

      // Move the uploaded photo to the 'public/uploads' directory
      await photo.mv(`./public${photoUrl}`);
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

    // Delete user image file from the 'public/uploads' directory
    if (user.photoUrl) {
      const imagePath = `./public${user.photoUrl}`;

      // Check if the file exists before attempting to delete
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the user from the database
    await user.deleteOne();

    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/email-send", async (req, res) => {
  const { name, email, subject } = req.body;
  const { attachment } = req.files;
  // Formating content to be send
  var emailcontent = `<h3> Contact Details</h3>
                     <ul>
                      <li>name: ${name}</li>
                      <li>email : ${email}</li>
                     </ul>
                     <h2>Message</h2>
                      <p>message: ${subject}</p>`;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: username,
      pass: password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // for multiple content
  const attachments = [];
  if (attachment) {
    attachments.push({
      filename: attachment.name, // Use the original filename
      content: attachment.data, // Use buffer data
      encoding: "base64",
      mimeType: attachment.mimetype, // Use file mine type
    });
  }
  // Preparing the mailOptions object
  var mailOptions = {
    from: username,
    to: email,
    subject: "New Message",
    text: subject,
    html: emailcontent,
    attachments: attachments,
  };
  // Sending email using transporter function
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error", success: false });
    } else {
      res.status(200).json({ msg: "Email sent successfully", success: true });
    }
  });
});

module.exports = router;
