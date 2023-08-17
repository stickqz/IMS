import React from "react";
import "./styles.css";

const SalesHistory = () => {
	return (
		<div className="component-container">
			<h2 className="component-heading">Sales History</h2>
			{/* List of sales transactions */}
			<ul className="sales-list">
				<li>Sale 1</li>
				<li>Sale 2</li>
				<li>Sale 3</li>
			</ul>
		</div>
	);
};

export default SalesHistory;
