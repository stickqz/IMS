const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import the User model (assuming you have one defined)
const User = require("../models/User");

// Define the '/signup' route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Create and save the user
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store hashed password
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// New route for user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role }, "anujrajprasoon", {
      expiresIn: "1h",
    });

    // Set the token as an HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour in milliseconds
      secure: false, // Set to true if using HTTPS
    });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    // Clear the token cookie by setting an expired token
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    // Respond with a successful message
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to fetch user's name based on role
router.get("/getUserName", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Decoded user ID from JWT token
    const userRole = req.user.role; // Decoded user role from JWT token

    let userName = "";

    if (userRole === "admin") {
      const admin = await Admin.findById(userId);
      if (admin) {
        userName = admin.username;
      }
    } else if (userRole === "employee") {
      const employee = await Employee.findById(userId);
      if (employee) {
        userName = employee.username;
      }
    }

    if (!userName) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ name: userName });
  } catch (error) {
    console.error("Fetch user name error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
