import React from "react";
import "./BillDetailsDialog.css"; // Add necessary styles

const BillDetailsDialog = ({ isOpen, onClose, billDetails }) => {
	if (!isOpen) return null;

	const totalSum = billDetails.reduce((sum, item) => sum + item.netPrice, 0);

	return (
		<div className="dialog-overlay">
			<div className="dialog-content">
				<button className="close-button" onClick={onClose}>
					Close
				</button>
				<h2>Bill Details</h2>
				<table className="bill-details-table">
					<thead>
						<tr>
							<th>Product Name</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Net Price</th>
						</tr>
					</thead>
					<tbody>
						{/* Loop through billDetails and render rows */}
						{billDetails.map((item, index) => (
							<tr key={index}>
								<td>{item.productName}</td>
								<td>{item.sellingPrice}</td>
								<td>{item.quantity}</td>
								<td>{item.netPrice}</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td></td>
							<td></td>
							<td>
								<strong>Total:</strong>
							</td>
							<td>{totalSum.toFixed(2)}</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	);
};

export default BillDetailsDialog;
