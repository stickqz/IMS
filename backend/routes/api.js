const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const Employee = require("../models/Employee");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, "anujrajprasoon");
    req.user = decodedToken; // Store the decoded token in request object
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Define the '/admin/signup' route for admin registration
router.post("/admin/signup", async (req, res) => {
  try {
    const { username, email, password, shopName } = req.body;

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

    if (role === "admin") {
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
