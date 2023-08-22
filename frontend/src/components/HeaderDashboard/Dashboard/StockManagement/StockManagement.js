import React, { useState, useEffect } from "react";
import axios from "axios";
import AddStock from "./AddStock";
import "./StockManagement.css";

const StockManagement = () => {
  const [activeTab, setActiveTab] = useState("view");
  const [stockData, setStockData] = useState([]);
  const [editStockProductName, setEditStockProductName] = useState("");
  const [editedProductQuantity, setEditedProductQuantity] = useState("");
  const [editedCostPrice, setEditedCostPrice] = useState("");
  const [editedSellingPrice, setEditedSellingPrice] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const token = localStorage.getItem("token");

  const handleTabChange = (tab) => setActiveTab(tab);

  useEffect(() => {
    // Make a GET request to fetch stock data from the backend
    axios
      .get("http://localhost:5000/api/admin/stock", {
        headers: {
          Authorization: `Bearer ${token}`, // Include your authentication token here
        },
      })
      .then((response) => {
        setStockData(response.data);
        console.log(response.data);
        setLoading(false); // Update loading state when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching stock data:", error);
      });
  }, [token]);

  const handleSaveEdit = (productName) => {
    const updatedStockItem = {
      productQuantity: editedProductQuantity,
      costPrice: editedCostPrice,
      sellingPrice: editedSellingPrice,
    };
    console.log(updatedStockItem);

    // Make a PUT request to update the stock item in the backend
    axios
      .put(
        `http://localhost:5000/api/admin/stock/${productName}`,
        updatedStockItem,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include your authentication token here
          },
        }
      )
      .then(() => {
        // Update the local state with the edited data
        const updatedData = stockData.map((stockItem) =>
          stockItem.productName === productName
            ? { ...stockItem, ...updatedStockItem }
            : stockItem
        );
        setStockData(updatedData);
        setEditStockProductName(null);
      })
      .catch((error) => {
        console.error("Error updating stock data:", error);
      });
  };

  const handleDelete = (productName) => {
    // Make a DELETE request to delete the stock item in the backend
    axios
      .delete(`http://localhost:5000/api/admin/stock/${productName}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include your authentication token here
        },
      })
      .then(() => {
        // Remove the deleted item from the local state
        const updatedData = stockData.filter(
          (stockItem) => stockItem.productName !== productName
        );
        setStockData(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting stock data:", error);
      });
  };
  const handleCancelEdit = () => {
    setEditStockProductName(null);
    setEditedProductQuantity("");
    setEditedCostPrice("");
    setEditedSellingPrice("");
  };

  const handleEdit = (productName) => {
    setEditStockProductName(productName);
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
      {activeTab === "add" && (
        <div className="add-stock-animation">
          {" "}
          <AddStock />{" "}
        </div>
      )}
      {activeTab === "view" && (
        <div>
          <h3>Stock List</h3>
          {loading ? (
            <p>Loading data...</p> // Display a loading message while fetching data
          ) : (
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
                  <tr key={stockItem.productName}>
                    <td>{stockItem.productName}</td>
                    <td>
                      {stockItem.productName === editStockProductName ? (
                        <input
                          className="stock-edit-field"
                          type="text"
                          value={editedProductQuantity}
                          onChange={(e) =>
                            setEditedProductQuantity(e.target.value)
                          }
                        />
                      ) : (
                        stockItem.productQuantity
                      )}
                    </td>
                    <td>
                      {stockItem.productName === editStockProductName ? (
                        <input
                          className="stock-edit-field"
                          type="text"
                          value={editedCostPrice}
                          onChange={(e) => setEditedCostPrice(e.target.value)}
                        />
                      ) : (
                        stockItem.costPrice
                      )}
                    </td>
                    <td>
                      {stockItem.productName === editStockProductName ? (
                        <input
                          className="stock-edit-field"
                          type="text"
                          value={editedSellingPrice}
                          onChange={(e) =>
                            setEditedSellingPrice(e.target.value)
                          }
                        />
                      ) : (
                        stockItem.sellingPrice
                      )}
                    </td>
                    <td>
                      {stockItem.productName === editStockProductName ? (
                        <div className="stock-edited-button">
                          <button
                            className="stock-save-button"
                            onClick={() =>
                              handleSaveEdit(stockItem.productName)
                            }
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
                            onClick={() => handleEdit(stockItem.productName)}
                          >
                            Edit
                          </button>
                          <button
                            className="stock-delete-button"
                            onClick={() => handleDelete(stockItem.productName)}
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
          )}
        </div>
      )}
    </div>
  );
};

export default StockManagement;
