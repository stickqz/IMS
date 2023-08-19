import React from "react";

const Navbar = ({ onSelectComponent }) => {
	return (
		<div className="navbar">
			<button onClick={() => onSelectComponent("create-order")}>
				Create Order
			</button>
			<button onClick={() => onSelectComponent("employee-management")}>
				Employee Management
			</button>
			<button onClick={() => onSelectComponent("stock-management")}>
				Stock Management
			</button>
			<button onClick={() => onSelectComponent("sales-history")}>
				Sales History
			</button>
			<button onClick={() => onSelectComponent("billing")}>
				Billing
			</button>
		</div>
	);
};

export default Navbar;
