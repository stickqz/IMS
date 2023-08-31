import React, { useState, useEffect } from "react";
import "./Billing.css";
import "../../styles.css";
import axios from "axios";

const Billing = () => {
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [generateSuccessMessage, setGenerateSuccessMessage] = useState("");
  const [generateErrorMessage, setGenerateErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productName && quantity) {
      const productExists = items.some(
        (item) => item.productName === productName
      );

      if (productExists) {
        setErrorMessage(
          "Product with the same name is already in billing area."
        );
        setSuccessMessage("");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/admin/check-product-availability",
            {
              productName,
              desiredQuantity: parseInt(quantity),
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            // Product is available
            const newItem = {
              productName,
              quantity: parseInt(quantity),
              price: response.data.sellingPrice, // Update price with sellingPrice from the backend
            };
            setItems([...items, newItem]);
            setProductName("");
            setQuantity("");
            setErrorMessage(""); // Clear any previous error message
            setSuccessMessage("Product added successfully!");
          }
        } catch (error) {
          if (error.message === "Request failed with status code 404") {
            setErrorMessage("Product not found.");
            setSuccessMessage("");
            setTimeout(() => {
              setErrorMessage("");
            }, 3000);
          } else if (error.message === "Request failed with status code 400") {
            setErrorMessage(
              "Desired quantity is greater than available quantity"
            );
            setSuccessMessage("");
            setTimeout(() => {
              setErrorMessage("");
            }, 3000);
          }
          console.error("Error checking product availability:", error);
        }
      }
    }
  };

  const formatDataForBackend = () => {
    // Format the items data into the required format for the backend
    return items.map((item) => ({
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      netPrice: item.price * item.quantity,
    }));
  };

  const handleGenerateBill = async () => {
    const formattedData = formatDataForBackend();
    console.log(formattedData);
    if (
      formattedData.some((item) => isNaN(item.quantity) || item.quantity <= 0)
    ) {
      console.log("error is me");
      return;
    }
    try {
      // Calculate the total amount based on the formatted data

      const response = await axios.put(
        "http://localhost:5000/api/admin/edit-product-quantities",
        {
          products: formattedData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Handle success, e.g., show a success message
        setGenerateSuccessMessage("Bill generated successfully!");
        setGenerateErrorMessage("");
        setItems([]); // Clear the items list after generating the bill
      }
    } catch (error) {
      // Handle any errors, e.g., display an error message
      console.error("Error generating bill:", error);
      setGenerateSuccessMessage(""); // Clear any previous success message
      setGenerateErrorMessage("Error generating bill. Please try again.");
    }
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    // Clear success message after 3 seconds
    const successMessageTimeout = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => {
      clearTimeout(successMessageTimeout);
    };
  }, [successMessage]);

  return (
    <div className="component-container">
      <h2>Billing</h2>
      <form onSubmit={handleSubmit} className="billing-form">
        <div className="form-inputs">
          <input
            type="text"
            placeholder="Product Name"
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            min="1"
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <button type="submit">Add</button>
      </form>
      <div className="billing-table-container">
        <div className="total-price">Total Price: ${calculateTotalPrice()}</div>
        <div className="table-scroll">
          <table className="billing-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Net Price</th>
                <th>Action</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="table-content">
          <table className="billing-table">
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.productName}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {generateSuccessMessage && (
        <div className="success-message">{generateSuccessMessage}</div>
      )}
      {generateErrorMessage && (
        <div className="error-message">{generateErrorMessage}</div>
      )}
      <button onClick={handleGenerateBill} className="generate-bill-button">
        Generate
      </button>
    </div>
  );
};

export default Billing;
