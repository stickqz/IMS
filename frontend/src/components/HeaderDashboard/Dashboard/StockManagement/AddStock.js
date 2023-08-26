import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AddStock.css";
import axios from "axios";

const AddStock = (props) => {
  const token = localStorage.getItem("token");
  const { register, handleSubmit, reset } = useForm();

  const [stockInfo, setstockInfo] = useState();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        setMessage(responseData.message);
        setMessageType("success");
        reset(); 
      } else {
        const responseData = await response.json();
        setMessage(responseData.message);
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred");
      setMessageType("error");
    }
  };

  return (
    <div className="add-stock-container">
      <h2>Add Stock</h2>
      {message && <div className={`message ${messageType}`}>{message}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="add-stock-form">
        <input
          type="text"
          id="productName"
          className="add-stock-input-field"
          placeholder="Enter Product Name"
          {...register("productName", {
            required: "Enter Product Name",
          })}
        />
        <input
          type="number"
          id="productQuantity"
          className="add-stock-input-field"
          placeholder="Enter Product Quantity"
          {...register("productQuantity", {
            required: "Enter Product Quantity",
          })}
        />
        <input
          type="number"
          id="costPrice"
          className="add-stock-input-field"
          placeholder="Enter Cost Price"
          {...register("costPrice", {
            required: "Enter Cost Price",
          })}
        />
        <input
          type="number"
          id="sellingPrice"
          className="add-stock-input-field"
          placeholder="Enter Selling Price"
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
