import React from "react";
import "../../styles.css";

const StockManagement = () => {
	return (
		<div className="component-container">
			<h2 className="component-heading">Stock Management</h2>
			{/* List of stock items */}
			<ul className="stock-list">
				<li>Product A</li>
				<li>Product B</li>
				<li>Product C</li>
			</ul>
			<div className="button-container">
				<button className="add-button">Add Stock</button>
				<button className="edit-button">Edit Stock</button>
				<button className="remove-button">Remove Stock</button>
			</div>
		</div>
	);
};

export default StockManagement;
