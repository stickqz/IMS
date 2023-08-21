import React, { useState } from "react";
import "./AddStock.css";

const AddStock = () => {
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);

  const handleAddStock = () => {
    // Add stock logic here
    // You can use API calls to add the stock data
  };

  return (
    <div className="add-stock-container">
      <h2>Add Stock</h2>
      <form onSubmit={handleAddStock} className="add-stock-form">
      <label className='add-stock-label'>Product Name</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
          className="add-stock-input-field"
        />
        <label className='add-stock-label'>Product Quantity</label>
        <input
          type="number"
          id="productQuantity"
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
          placeholder="Product Quantity"
          className="add-stock-input-field"
        />
        <label className='add-stock-label'>cost price</label>
        <input
          type="number"
          id="costPrice"
          value={costPrice}
          onChange={(e) => setCostPrice(e.target.value)}
          placeholder="Cost Price"
          className="add-stock-input-field"
        />
        <label className='add-stock-label'>Selling price</label>
        <input
          type="number"
          id="sellingPrice"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          placeholder="Selling Price"
          className="add-stock-input-field"
        />
        <button type="submit" className="add-stock-submit-button">
          Add Stock
        </button>
      </form>
    </div>
  );
};

export default AddStock;
