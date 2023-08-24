import "./AddEmployee.css";
import React, { useState } from "react";

const AddEmployee = ({ onAddEmployee }) => {
  const token = localStorage.getItem("token");

  const initialState = {
    name: "",
    email: "",
    password: "",
    phone: "",
    salary: "",
  };

  const [employeeData, setEmployeeData] = useState(initialState);
  const [message, setMessage] = useState(""); // State for displaying messages

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newEmployeeData = {
      username: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      phone: formData.get("phone"),
      salary: formData.get("salary"),
    };

    try {
      const response = await fetch("http://localhost:5000/api/admin/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEmployeeData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response status:", response.status);
        onAddEmployee(responseData);

        // Show success message
        setMessage("New employee added successfully!");

        // Clear the form fields
        setEmployeeData(initialState);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);

        // Show error message
        setMessage("An error occurred while adding the employee.");
      }
    } catch (error) {
      console.error("Network error:", error);

      // Show network error message
      setMessage("Network error occurred. Please try again.");
    }
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="add-employee-container">
      <h2>Add Employee</h2>
      {message && <p className={message.startsWith("Error") ? "error-message" : "success-message"}>{message}</p>}
      <form onSubmit={submitHandler} className="add-employee-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="add-employee-input-field"
          value={employeeData.name}
          onChange={inputChangeHandler}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="add-employee-input-field"
          value={employeeData.email}
          onChange={inputChangeHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="add-employee-input-field"
          value={employeeData.password}
          onChange={inputChangeHandler}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="add-employee-input-field"
          value={employeeData.phone}
          onChange={inputChangeHandler}
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          className="add-employee-input-field"
          value={employeeData.salary}
          onChange={inputChangeHandler}
        />
        <button type="submit" className="add-employee-add-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
