const mongoose = require("mongoose");
const { Schema } = mongoose;

const salesHistorySchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  costPrice: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  saleDateTime: {
    type: Date,
    default: Date.now, // Default to the current date and time
  },
});

const stockSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  costPrice: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
});

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  stock: [stockSchema],
  salesHistory: [salesHistorySchema],
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
