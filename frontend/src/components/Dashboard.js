// Dashboard.js

import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token"); // Retrieve token from storage
  console.log("Token exists:", token);

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      const role = decoded.role;
      console.log("Decoded Token exists:", decoded);

      axios
        .get(`http://localhost:5000/api/${role}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          // Handle different types of errors
          if (error.response) {
            // The request was made and the server responded with a status code
            console.error("Error response from server:", error.response);
          } else if (error.request) {
            // The request was made but no response was received
            console.error("No response from server:", error.request);
          } else {
            // Something happened in setting up the request
            console.error("Request setup error:", error.message);
          }

          localStorage.removeItem("token");
        });
    }
  }, [token]);

  return (
    <div>
      {userData ? (
        <div>
          <h2>Welcome to Your Dashboard, {userData.username}</h2>
          <p>Email: {userData.email}</p>
          {/* Display other user-specific information */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
