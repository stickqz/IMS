// Dashboard.js
import Navbar from "./HeaderComponents/Dashboard/Navbar/Navbar";
import CreateOrder from "./HeaderComponents/Dashboard/StockManagement/CreateOrder";
import EmployeeManagement from "./HeaderComponents/Dashboard/EmployeeManagement/EmployeeManagement";
import StockManagement from "./HeaderComponents/Dashboard/StockManagement/StockManagement";
import SalesHistory from "./HeaderComponents/Dashboard/SalesHistory/SalesHistory";
import Billing from "./HeaderComponents/Dashboard/Billing/Billing";
import "./styles.css";

import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

function HeaderDashboard() {
	const [userData, setUserData] = useState(null);
	const [selectedComponent, setSelectedComponent] = useState(null);

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
						console.error(
							"Error response from server:",
							error.response
						);
					} else if (error.request) {
						// The request was made but no response was received
						console.error(
							"No response from server:",
							error.request
						);
					} else {
						// Something happened in setting up the request
						console.error("Request setup error:", error.message);
					}

					localStorage.removeItem("token");
				});
		}
	}, [token]);

	const renderComponent = () => {
		switch (selectedComponent) {
			case "create-order":
				return <CreateOrder />;
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
			{userData ? (
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
			)}
		</div>
	);
}

export default HeaderDashboard;
