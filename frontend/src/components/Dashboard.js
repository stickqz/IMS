import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios"; // Import axios
import Cookies from "js-cookie"; // Import the js-cookie library
import jwt_decode from "jwt-decode";

const Dashboard = () => {
  const [userName, setUserName] = useState(""); // State to hold the user's name
  const [userRole, setUserRole] = useState(""); // State to hold the user's role

  const handleLogout = async () => {
    try {
      // Make an API request to log out
      await axios.post("http://localhost:5000/api/logout");

      // Remove the token from the cookie on the client side
      Cookies.remove("token"); // Remove the token cookie

      console.log("Logged out");

      // Redirect the user to the home page
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    // Fetch the user's name and role from the server
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          // Handle case where token is not present
          console.log("error is me");
          return;
        }

        // Decode the token to get user role
        const decodedToken = jwt_decode(token); // You need to import jwt_decode

        // Fetch the user's name based on role
        const response = await axios.get(
          "http://localhost:5000/api/getUserName"
        );
        setUserName(response.data.name); // Assuming the response has a 'name' field

        // Set the user's role
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Fetch user data error:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="content">
        <div className="content-inner">
          {userName && (
            <p>
              Welcome, {userRole === "employee" ? "Employee" : "Admin"}{" "}
              {userName}!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
