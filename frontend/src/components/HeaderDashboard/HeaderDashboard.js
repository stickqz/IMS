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
	const uri = process.env.REACT_APP_API;
	const [userData, setUserData] = useState(null);
	const [selectedComponent, setSelectedComponent] = useState("billing");

	const token = localStorage.getItem("token");
	useEffect(() => {
		if (token) {
			const decoded = jwt_decode(token);
			const role = decoded.role;
			// console.log(role);

			axios
				.get(uri + `/api/${role}/profile`, {
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
				});
		}
	}, [token]);
	const decoded = jwt_decode(token);
	const role = decoded.role;

	const renderComponent = () => {
		switch (selectedComponent) {
			case "profile":
				return <Profile role={role} />;
			case "employee-management":
				return <EmployeeManagement />;
			case "stock-management":
				return <StockManagement role={role} />;
			case "sales-history":
				return <SalesHistory role={role} />;
			case "billing":
				return <Billing role={role} />;
			default:
				return null;
		}
	};

	return (
		<div>
			<div>
				<div className="header-dashboard">
					<div className="navbar-container">
						<Navbar
							selectComponent={selectedComponent}
							onSelectComponent={setSelectedComponent}
							role={role}
						/>
					</div>
					<div className="dashboard">{renderComponent()}</div>
				</div>
			</div>
		</div>
	);
}

export default HeaderDashboard;
