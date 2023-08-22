import "./AddEmployee.css";
import React from "react";

const AddEmployee = ({ onAddEmployee }) => {
  const token = localStorage.getItem("token");

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const employeeData = {
      username: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      phone: formData.get("phone"),
    };

    try {
      // Make a POST request to your backend API
      const response = await fetch("http://localhost:5000/api/admin/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // Add any headers needed for authentication (e.g., authorization token)
        },
        body: JSON.stringify(employeeData), // Convert data to JSON
      });

      if (response.ok) {
        // Employee added successfully
        const responseData = await response.json();
        // You can handle the response data here if needed
        onAddEmployee(responseData);
      } else {
        // Handle error response from the backend
        const errorData = await response.json();
        console.error("Error:", errorData);
        // Handle the error or display an error message to the user
      }
    } catch (error) {
      console.error("Network error:", error);
      // Handle network error, e.g., show a message to the user
    }
  };

  return (
    <div className="add-employee-container">
      <h2>Add Employee</h2>
      <form onSubmit={submitHandler} className="add-employee-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="add-employee-input-field"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="add-employee-input-field"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="add-employee-input-field"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="add-employee-input-field"
        />
        <button type="submit" className="add-employee-add-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
