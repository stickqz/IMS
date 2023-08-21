import React, { useState, useEffect } from "react";
import AddStock from './AddStock';
import "./StockManagement.css";

const StockManagement = () => {
  const [activeTab, setActiveTab] = useState("view");
  const [stockData, setStockData] = useState([]);
  const [editStockId, setEditStockId] = useState(null);
  const [editedProductQuantity, setEditedProductQuantity] = useState("");
  const [editedCostPrice, setEditedCostPrice] = useState("");
  const [editedSellingPrice, setEditedSellingPrice] = useState("");

  const handleTabChange = (tab) => setActiveTab(tab);

  const dummyStockData = [
    { pdt_id: 1, product_name: "Product A", product_quantity: "10", cost_price: "50", selling_price: "60" },
    { pdt_id: 2, product_name: "Product B", product_quantity: "20", cost_price: "30", selling_price: "40" },
    { pdt_id: 3, product_name: "Product C", product_quantity: "15", cost_price: "25", selling_price: "35" }
  ];

  useEffect(() => {
    setStockData(dummyStockData);
  }, []);

  const handleEdit = (id) => {
    const stockToEdit = stockData.find((stockItem) => stockItem.pdt_id === id);
    if (stockToEdit) {
      setEditStockId(id);
      setEditedProductQuantity(stockToEdit.product_quantity);
      setEditedCostPrice(stockToEdit.cost_price);
      setEditedSellingPrice(stockToEdit.selling_price);
    }
  };

  const handleSaveEdit = (id) => {
    const updatedData = stockData.map((stockItem) =>
      stockItem.pdt_id === id
        ? {
            ...stockItem,
            product_quantity: editedProductQuantity,
            cost_price: editedCostPrice,
            selling_price: editedSellingPrice,
          }
        : stockItem
    );
    setStockData(updatedData);
    setEditStockId(null);
    setEditedProductQuantity("");
    setEditedCostPrice("");
    setEditedSellingPrice("");
  };

  const handleCancelEdit = () => {
    setEditStockId(null);
    setEditedProductQuantity("");
    setEditedCostPrice("");
    setEditedSellingPrice("");
  };

  const handleDelete = (id) => {
    const updatedData = stockData.filter((stockItem) => stockItem.pdt_id !== id);
    setStockData(updatedData);
  };

  return (
    <div className="component-container">
      <h2 className="stock-component-heading">Stock Management</h2>
      <div className="stock-button-container">
        <button
          onClick={() => handleTabChange("view")}
          className={`stock-tab-button ${activeTab === "view" ? "active" : ""}`}
        >
          View Stock
        </button>
        <button
          onClick={() => handleTabChange("add")}
          className={`stock-tab-button ${activeTab === "add" ? "active" : ""}`}
        >
          Add Stock
        </button>
      </div>
      {activeTab === "add" && 
      <div className="add-stock-animation"> <AddStock /> </div>}
      {activeTab === "view" && (
        <div>
          <h3>Stock List</h3>
          <table className="stock-list-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Quantity</th>
                <th>Cost Price</th>
                <th>Selling Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((stockItem) => (
                <tr key={stockItem.pdt_id}>
                  <td>{stockItem.product_name}</td>
                  <td>
                    {stockItem.pdt_id === editStockId ? (
                      <input
                        className="stock-edit-field"
                        type="text"
                        value={editedProductQuantity}
                        onChange={(e) => setEditedProductQuantity(e.target.value)}
                      />
                    ) : (
                      stockItem.product_quantity
                    )}
                  </td>
                  <td>
                    {stockItem.pdt_id === editStockId ? (
                      <input
                        className="stock-edit-field"
                        type="text"
                        value={editedCostPrice}
                        onChange={(e) => setEditedCostPrice(e.target.value)}
                      />
                    ) : (
                      stockItem.cost_price
                    )}
                  </td>
                  <td>
                    {stockItem.pdt_id === editStockId ? (
                      <input
                        className="stock-edit-field"
                        type="text"
                        value={editedSellingPrice}
                        onChange={(e) => setEditedSellingPrice(e.target.value)}
                      />
                    ) : (
                      stockItem.selling_price
                    )}
                  </td>
                  <td>
                    {stockItem.pdt_id === editStockId ? (
                      <div className="stock-edited-button">
                        <button
                          className="stock-save-button"
                          onClick={() => handleSaveEdit(stockItem.pdt_id)}
                        >
                          Save
                        </button>
                        <button
                          className="stock-cancel-button"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="stock-actions">
                        <button
                          className="stock-edit-button"
                          onClick={() => handleEdit(stockItem.pdt_id)}
                        >
                          Edit
                        </button>
                        <button
                          className="stock-delete-button"
                          onClick={() => handleDelete(stockItem.pdt_id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockManagement;
