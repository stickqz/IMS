const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const Employee = require("../models/Employee");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, "anujrajprasoon"); // Replace with your actual secret key
    req.user = decodedToken; // Attach the decoded token payload to req.user
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Define the '/admin/signup' route for admin registration
router.post("/admin/signup", async (req, res) => {
  try {
    const { email, password, shopName, username } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      shopName,
    });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Admin Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Define the '/admin/employee' route for admin to create an employee
router.post("/admin/employee", async (req, res) => {
  try {
    const { username, password, address, email, adminId } = req.body;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: "Employee with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      username,
      email,
      password: hashedPassword,
      address,
      admin: admin._id, // Link to the admin who is creating the employee
    });
    await newEmployee.save();

    res.status(201).json({ message: "Employee registered successfully" });
  } catch (error) {
    console.error("Employee Creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// New route for user login
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user;

    if (role === "Admin") {
      user = await Admin.findOne({ email });
    } else if (role === "employee") {
      user = await Employee.findOne({ email });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(402).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, role }, // Include user ID and role in the token payload
      "anujrajprasoon", // Replace with your actual secret key
      { expiresIn: "1h" } // Token expiration time
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:role/profile", verifyToken, async (req, res) => {
  try {
    const { role } = req.params;
    const userId = req.user.email;

    let userProfile;

    if (role === "Admin") {
      userProfile = await Admin.findOne({ email: userId });
    } else if (role === "employee") {
      userProfile = await Employee.findOne({ email: userId });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Profile Retrieval error:", error);
    console.error("Error Details:", error.message, error.stack);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
