import React from "react";
import "../../styles.css";

const CreateOrder = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
	};

	return (
		<div className="component-container">
			<h2 className="component-heading">Create Order</h2>
			<form onSubmit={handleSubmit} className="form">
				{/* Form fields and inputs */}
				<input type="text" placeholder="Product Name" />
				<input type="number" placeholder="Quantity" />
				<button type="submit" className="submit-button">
					Submit Order
				</button>
			</form>
		</div>
	);
};

export default CreateOrder;
