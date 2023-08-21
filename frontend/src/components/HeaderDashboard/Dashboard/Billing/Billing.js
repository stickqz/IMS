import React, { useState } from "react";
import "./Billing.css";
import "../../styles.css";

const Billing = () => {
	const [items, setItems] = useState([]);
	const [productName, setProductName] = useState("");
	const [quantity, setQuantity] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (productName && quantity) {
			const newItem = {
				productName,
				quantity: parseInt(quantity),
				price: 10, // Replace with actual product price
			};
			setItems([...items, newItem]);
			setProductName("");
			setQuantity("");
		}
	};

	const handleDelete = (index) => {
		const updatedItems = items.filter((item, i) => i !== index);
		setItems(updatedItems);
	};

	const calculateTotalPrice = () => {
		return items.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	};

	return (
		<div className="component-container">
			<h2>Billing</h2>
			<form onSubmit={handleSubmit} className="billing-form">
				<div className="form-inputs">
					<input
						type="text"
						placeholder="Product Name"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
						required
					/>
					<input
						type="number"
						placeholder="Quantity"
						value={quantity}
						min="1"
						onChange={(e) => setQuantity(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Add</button>
			</form>
			<div className="billing-table-container">
				<div className="total-price">
					Total Price: ${calculateTotalPrice()}
				</div>
				<div className="table-scroll">
					<table className="billing-table">
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Net Price</th>
								<th>Action</th>
							</tr>
						</thead>
					</table>
				</div>
				<div className="table-content">
					<table className="billing-table">
						<tbody>
							{items.map((item, index) => (
								<tr key={index}>
									<td>{item.productName}</td>
									<td>${item.price}</td>
									<td>{item.quantity}</td>
									<td>${item.price * item.quantity}</td>
									<td>
										<button
											onClick={() => handleDelete(index)}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<button className="generate-bill-button">Generate</button>
		</div>
	);
};

export default Billing;
