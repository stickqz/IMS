const mongoose = require("mongoose");
const { Schema } = mongoose;

const productDetailSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  netPrice: {
    type: Number,
    required: true,
  },
});

const billSchema = new Schema({
  billNo: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  details: [productDetailSchema],
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
  bills: [billSchema],
});

billSchema.pre("save", function (next) {
  if (!this.billNo) {
    this.billNo = "BN001";
  } else {
    const lastDigit = parseInt(this.billNo.slice(-3), 10);
    this.billNo = `BN${String(lastDigit + 1).padStart(3, "0")}`;
  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
