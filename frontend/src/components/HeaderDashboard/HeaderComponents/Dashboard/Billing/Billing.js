import React from "react";
import "../../../styles.css";

const Billing = () => {
	return (
		<div className="component-container">
			<h2 className="component-heading">Billing</h2>
			{/* Billing information and calculations */}
			<div className="billing-info">
				<p>Total Amount: $500</p>
				<p>Discount: 10%</p>
				<p>Final Amount: $450</p>
			</div>
			<button className="generate-button">Generate Bill</button>
		</div>
	);
};

export default Billing;
