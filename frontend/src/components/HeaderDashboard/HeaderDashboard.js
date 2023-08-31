// Dashboard.js
import Navbar from "./Dashboard/Navbar/Navbar";
import EmployeeManagement from "./Dashboard/EmployeeManagement/EmployeeManagement";
import StockManagement from "./Dashboard/StockManagement/StockManagement";
import SalesHistory from "./Dashboard/SalesHistory/SalesHistory";
import Billing from "./Dashboard/Billing/Billing";
import Profile from "./Dashboard/Profile/Profile";
import "./styles.css";

import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

function HeaderDashboard() {
  const [userData, setUserData] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState("profile");

  const token = localStorage.getItem("token"); // Retrieve token from storage

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      const role = decoded.role;

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
        });
    }
  }, [token]);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "profile":
        return <Profile />;
      case "employee-management":
        return <EmployeeManagement />;
      case "stock-management":
        return <StockManagement />;
      case "sales-history":
        return <SalesHistory />;
      case "billing":
        return <Billing />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* {userData ? (
				<div>
					<div className="header-dashboard">
						<div className="navbar-container">
							<Navbar onSelectComponent={setSelectedComponent} />
						</div>
						<div className="dashboard">{renderComponent()}</div>
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)} */}
      <div>
        <div className="header-dashboard">
          <div className="navbar-container">
            <Navbar onSelectComponent={setSelectedComponent} />
          </div>
          <div className="dashboard">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDashboard;
