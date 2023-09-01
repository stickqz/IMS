import React, { useState, useEffect } from "react";
import axios from "axios";
import AddStock from "./AddStock";
import "./StockManagement.css";

const StockManagement = () => {
  const [activeTab, setActiveTab] = useState("view");
  const [stockData, setStockData] = useState({
    productName: "",
    quantity: 0,
    editProductName: "",
    editedProductQuantity: "",
    editedCostPrice: "",
    editedSellingPrice: "",
    loading: true,
  });
  const [editingProduct, setEditingProduct] = useState(null);

  const token = localStorage.getItem("token");

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleSaveEdit = (productName) => {
    const updatedStockItem = {
      productQuantity: stockData.editedProductQuantity,
      costPrice: stockData.editedCostPrice,
      sellingPrice: stockData.editedSellingPrice,
    };
  
    // Make a PUT request to update the stock item in the backend
    axios
      .put(
        `http://localhost:5000/api/admin/stock/${productName}`,
        updatedStockItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        // Update the local state with the edited data
        const updatedStockData = stockData.stockData.map((stockItem) =>
          stockItem.productName === productName
            ? { ...stockItem, ...updatedStockItem }
            : stockItem
        );
        setStockData({
          ...stockData,
          stockData: updatedStockData,
          editProductName: null,
          editedProductQuantity: "",
          editedCostPrice: "",
          editedSellingPrice: "",
        });
        setEditingProduct(null);
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
        const updatedData = stockData.stockData.filter(
          (stockItem) => stockItem.productName !== productName
        );
        setStockData({ ...stockData, stockData: updatedData });
      })
      .catch((error) => {
        console.error("Error deleting stock data:", error);
      });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null); // Clear the editingProduct state
    setStockData({
      ...stockData,
      editProductName: null,
      editedProductQuantity: "",
      editedCostPrice: "",
      editedSellingPrice: "",
    });
  };
  

  const handleEdit = (productName) => {
    const selectedStockItem = stockData.stockData.find(
      (stockItem) => stockItem.productName === productName
    );
  
    if (selectedStockItem) {
      setStockData({
        ...stockData,
        editProductName: productName,
        editedProductQuantity: selectedStockItem.productQuantity,
        editedCostPrice: selectedStockItem.costPrice,
        editedSellingPrice: selectedStockItem.sellingPrice,
      });
      setEditingProduct(productName);
    }
  };
  const fetchStockData = () => {
    axios
      .get("http://localhost:5000/api/admin/stock", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStockData({
          ...stockData,
          stockData: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Error fetching stock data:", error);
      });
  };

  useEffect(() => {
    
    axios
      .get("http://localhost:5000/api/admin/stock", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      .then((response) => {
        setStockData({
          ...stockData,
          stockData: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Error fetching stock data:", error);
      });
  }, [token]);

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
          <AddStock onStockUpdate={fetchStockData} />{" "}
        </div>
      )}
      {activeTab === "view" && (
        <div >
        
          {stockData.loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <div className=" stock-table-container">
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
                  {stockData.stockData.map((stockItem) => (
                    <tr key={stockItem.productName}>
                      <td>{stockItem.productName}</td>
                      <td>
                        {editingProduct === stockItem.productName ? (
                          <input
                            className="stock-edit-field"
                            type="text"
                            value={
                              stockData.editedProductQuantity !== null
                                ? stockData.editedProductQuantity
                                : stockItem.productQuantity
                            }
                            onChange={(e) =>
                              setStockData({
                                ...stockData,
                                editedProductQuantity: e.target.value,
                              })
                            }
                          />
                        ) : (
                          stockItem.productQuantity
                        )}
                      </td>
                      <td>
                        {editingProduct === stockItem.productName ? (
                          <input
                            className="stock-edit-field"
                            type="text"
                            value={
                              stockData.editedCostPrice !== null
                                ? stockData.editedCostPrice
                                : stockItem.costPrice
                            }
                            onChange={(e) =>
                              setStockData({
                                ...stockData,
                                editedCostPrice: e.target.value,
                              })
                            }
                          />
                        ) : (
                          stockItem.costPrice
                        )}
                      </td>
                      <td>
                        {editingProduct === stockItem.productName ? (
                          <input
                            className="stock-edit-field"
                            type="text"
                            value={
                              stockData.editedSellingPrice !== null
                                ? stockData.editedSellingPrice
                                : stockItem.sellingPrice
                            }
                            onChange={(e) =>
                              setStockData({
                                ...stockData,
                                editedSellingPrice: e.target.value,
                              })
                            }
                          />
                        ) : (
                          stockItem.sellingPrice
                        )}
                      </td>
                      <td>
                        {editingProduct === stockItem.productName ? (
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
                              onClick={() =>
                                handleDelete(stockItem.productName)
                              }
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
      )}
    </div>
  );
};

export default StockManagement;
