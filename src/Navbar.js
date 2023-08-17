import React from "react";
import { NavLink } from "react-router-dom";
import profileImage from "./profile-image.png"; // Import your profile image
import "./styles.css";

const Navbar = ({ onSelectComponent }) => {
	const handleComponentSelect = (component) => {
		onSelectComponent(component);
	};

	return (
		<div className="navbar">
			<button onClick={() => handleComponentSelect("create-order")}>
				Create Order
			</button>
			<button
				onClick={() => handleComponentSelect("employee-management")}
			>
				Employee Management
			</button>
			<button onClick={() => handleComponentSelect("stock-management")}>
				Stock Management
			</button>
			<button onClick={() => handleComponentSelect("sales-history")}>
				Sales History
			</button>
			<button onClick={() => handleComponentSelect("billing")}>
				Billing
			</button>
		</div>
	);
};

export default Navbar;
