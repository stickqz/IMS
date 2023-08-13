const express = require("express");
const router = express.Router();

// Import the User model (assuming you have one defined)
const User = require("../models/User");

// Define the '/signup' route
router.post("/signup", async (req, res) => {
  console.log("Received request:", req.url);
  try {
    const { username, email, password } = req.body;

    // Perform validation and create a new user
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
});

module.exports = router;
