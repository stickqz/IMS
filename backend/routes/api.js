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
router.post("/admin/employee", verifyToken, async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    const userId = req.user.email;
    const admin = await Admin.findOne({ email: userId });
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
      phone,
      admin: userId, // Link to the admin who is creating the employee
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

router.post("/admin/stock", verifyToken, async (req, res) => {
  try {
    const { productName, productQuantity, costPrice, sellingPrice } = req.body;

    // Find the admin based on the user's token or any other authentication method you're using
    const userId = req.user.email;
    const admin = await Admin.findOne({ email: userId });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Create a new stock item
    const newStockItem = {
      productName,
      productQuantity,
      costPrice,
      sellingPrice,
    };

    // Push the new stock item to the admin's stock array
    admin.stock.push(newStockItem);

    // Save the admin document with the updated stock
    await admin.save();

    res.status(201).json({ message: "Stock data added successfully" });
  } catch (error) {
    console.error("Stock Data Addition error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/admin/stock", verifyToken, async (req, res) => {
  try {
    // Find the admin based on the user's token or any other authentication method you're using
    const userId = req.user.email;
    const admin = await Admin.findOne({ email: userId });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Retrieve the stock data from the admin's stock array
    const stockData = admin.stock;

    // Send the stock data as a response
    res.status(200).json(stockData);
  } catch (error) {
    console.error("Stock Data Retrieval error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update stock item by productName
router.put("/admin/stock/:productName", verifyToken, async (req, res) => {
  try {
    const { productName } = req.params;
    const updatedStockItem = req.body;

    // Find the admin based on the user's token or any other authentication method you're using
    const userId = req.user.email;
    const admin = await Admin.findOne({ email: userId });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Find the stock item by productName
    const stockItem = admin.stock.find(
      (item) => item.productName === productName
    );

    if (!stockItem) {
      return res.status(404).json({ message: "Stock item not found" });
    }

    // Update the stock item
    Object.assign(stockItem, updatedStockItem);

    // Save the admin document with the updated stock
    await admin.save();

    res.status(200).json({ message: "Stock data updated successfully" });
  } catch (error) {
    console.error("Stock Data Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Delete stock item by productName
router.delete("/admin/stock/:productName", verifyToken, async (req, res) => {
  try {
    const { productName } = req.params;

    // Find the admin based on the user's token or any other authentication method you're using
    const userId = req.user.email;
    const admin = await Admin.findOne({ email: userId });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Find the index of the stock item to be deleted by productName
    const indexToDelete = admin.stock.findIndex(
      (item) => item.productName === productName
    );

    if (indexToDelete === -1) {
      return res.status(404).json({ message: "Stock item not found" });
    }

    // Remove the stock item from the admin's stock array
    admin.stock.splice(indexToDelete, 1);

    // Save the admin document with the updated stock
    await admin.save();

    res.status(200).json({ message: "Stock data deleted successfully" });
  } catch (error) {
    console.error("Stock Data Deletion error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
