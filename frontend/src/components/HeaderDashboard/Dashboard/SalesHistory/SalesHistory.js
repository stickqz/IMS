import React, { useState } from "react";
import "./SalesHistory.css";
import "../../styles.css";
import BillDetailsDialog from "./BillDetailsDialog";
import bills from "./BillData";

const SalesHistory = () => {
	const [selectedBill, setSelectedBill] = useState(null);

	const openDialog = (billDetails) => {
		setSelectedBill(billDetails);
	};

	const closeDialog = () => {
		setSelectedBill(null);
	};

	return (
		<div className="component-container bill-table-container">
			<h2 className="heading-main">Sales History</h2>
			<table className="bill-table">
				<thead>
					<tr>
						<th>Bill No</th>
						<th>Date</th>
						<th>Total Amount</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{bills.map((bill, index) => (
						<tr key={index}>
							<td>{bill.billNo}</td>
							<td>{bill.date}</td>
							<td>{bill.totalAmount}</td>
							<td>
								<button
									onClick={() => openDialog(bill.details)}
								>
									View
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<BillDetailsDialog
				isOpen={selectedBill !== null}
				onClose={closeDialog}
				billDetails={selectedBill}
			/>
		</div>
	);
};

export default SalesHistory;
