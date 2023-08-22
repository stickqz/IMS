import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AddStock.css";
import axios from "axios";

const AddStock = (props) => {
  const token = localStorage.getItem("token");
  const { register, handleSubmit } = useForm();

  const [stockInfo, setstockInfo] = useState();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:5000/api/admin/stock",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // Add any other headers as needed
          },
        }
      );
      console.log("Stock added:", response.data);
      setstockInfo(data);
    } catch (error) {
      console.error("Error registering stock:", error);
    }
  };

  return (
    <div className="add-stock-container">
      <h2>Add Stock</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="add-stock-form">
        <label className="add-stock-label">Product Name</label>
        <input
          type="text"
          id="productName"
          className="add-stock-input-field"
          {...register("productName", {
            required: "Enter Product Name",
          })}
        />
        <label className="add-stock-label">Product Quantity</label>
        <input
          type="number"
          id="productQuantity"
          className="add-stock-input-field"
          {...register("productQuantity", {
            required: "Enter Product Quantity",
          })}
        />
        <label className="add-stock-label">cost price</label>
        <input
          type="number"
          id="costPrice"
          className="add-stock-input-field"
          {...register("costPrice", {
            required: "Enter Cost Price",
          })}
        />
        <label className="add-stock-label">Selling price</label>
        <input
          type="number"
          id="sellingPrice"
          className="add-stock-input-field"
          {...register("sellingPrice", {
            required: "Enter Selling Price",
          })}
        />
        <button type="submit" className="add-stock-submit-button">
          Add Stock
        </button>
      </form>
    </div>
  );
};

export default AddStock;
