import React, { useState, useEffect } from "react";
import axios from "axios";
import AddStock from "./AddStock";
import SaveConfirmation from "./SaveConfirmation/SaveConfirmation";
import DeleteConfirmation from "./DeleteConfirmation/DeleteConfirmation";
import "./StockManagement.css";

const StockManagement = ({ role }) => {
	const uri = process.env.REACT_APP_API;
	const [activeTab, setActiveTab] = useState("view");
	const [stockData, setStockData] = useState([]);
	const [editProductName, setEditProductName] = useState(null);
	const [editedStock, setEditedStock] = useState({
		productName: "",
		productQuantity: 0,
		costPrice: "",
		sellingPrice: "",
	});
	const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	const filterStockData = () => {
		return stockData.filter((stockItem) =>
			stockItem.productName
				.toLowerCase()
				.includes(searchQuery.toLowerCase())
		);
	};

	const token = localStorage.getItem("token");

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	const handleEdit = (productName) => {
		const stockItemToEdit = stockData.find(
			(stockItem) => stockItem.productName === productName
		);
		if (stockItemToEdit) {
			setEditProductName(productName);
			setEditedStock({ ...stockItemToEdit });
		}
	};

	const handleCancelEdit = () => {
		setEditProductName(null);
		setEditedStock({
			productName: "",
			productQuantity: 0,
			costPrice: "",
			sellingPrice: "",
		});
	};

	const handleDeleteConfirmation = (productName) => {
		setShowDeleteConfirmation(true);
		setItemToDelete(productName);
	};

	const handleCancelDelete = () => {
		setShowDeleteConfirmation(false);
		setItemToDelete(null);
	};

	const handleConfirmDelete = () => {
		axios
			.delete(uri + `/api/admin/stock/${itemToDelete}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				const updatedData = stockData.filter(
					(stockItem) => stockItem.productName !== itemToDelete
				);
				setStockData(updatedData);
				setShowDeleteConfirmation(false);
				setItemToDelete(null);
			})
			.catch((error) => {
				console.error("Error deleting stock data:", error);
			});
	};

	const handleSaveConfirmation = (productName) => {
		setShowSaveConfirmation(true);
		setEditProductName(productName);
	};

	const handleConfirmSave = () => {
		const updatedStock = {
			productName: editedStock.productName,
			productQuantity: editedStock.productQuantity,
			costPrice: editedStock.costPrice,
			sellingPrice: editedStock.sellingPrice,
		};

		axios
			.put(uri + `/api/admin/stock/${editProductName}`, updatedStock, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				const updatedData = stockData.map((stockItem) =>
					stockItem.productName === editProductName
						? { ...updatedStock, productName: editProductName }
						: stockItem
				);

				setStockData(updatedData);
				setEditProductName(null);
				setEditedStock({
					productName: "",
					productQuantity: 0,
					costPrice: "",
					sellingPrice: "",
				});
				setShowSaveConfirmation(false);
			})
			.catch((error) => {
				console.error("Error updating stock data:", error);
			});
	};

	const fetchStockData = () => {
		axios
			.get(uri + "/api/admin/stock", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setStockData(response.data);
			})
			.catch((error) => {
				console.error("Error fetching stock data:", error);
			});
	};

	useEffect(() => {
		fetchStockData();
	}, [token]);

	// console.log(role); Admin

	return (
		<div className="component-container">
			<h2 className="stock-component-heading">Stock Management</h2>

			{role === "Admin" && (
				<div className="stock-button-container">
					<button
						onClick={() => handleTabChange("view")}
						className={`stock-tab-button ${
							activeTab === "view" ? "active" : ""
						}`}
					>
						View Stock
					</button>
					<button
						onClick={() => handleTabChange("add")}
						className={`stock-tab-button ${
							activeTab === "add" ? "active" : ""
						}`}
					>
						Add Stock
					</button>
				</div>
			)}
			{activeTab === "add" && (
				<div className="add-stock-animation">
					<AddStock onStockUpdate={fetchStockData} />
				</div>
			)}
			{activeTab === "view" && (
				<div>
					<div className="search-bar">
						<i className="icon">🔍</i>
						<input
							type="text"
							placeholder="Search..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<div className="stock-table-container">
						<table className="stock-list-table">
							<thead>
								<tr>
									<th>Product Name</th>
									<th>Product Quantity</th>
									<th>Cost Price</th>
									<th>Selling Price</th>
									{role === "Admin" && <th>Action</th>}
								</tr>
							</thead>
							<tbody>
								{filterStockData().map((stockItem) => (
									<tr key={stockItem.productName}>
										<td>
											{stockItem.productName ===
											editProductName ? (
												<input
													className="stock-edit-field"
													type="text"
													value={
														editedStock.productName
													}
													onChange={(e) =>
														setEditedStock({
															...editedStock,
															productName:
																e.target.value,
														})
													}
												/>
											) : (
												stockItem.productName
											)}
										</td>
										<td>
											{stockItem.productName ===
											editProductName ? (
												<input
													className="stock-edit-field"
													type="text"
													value={
														editedStock.productQuantity
													}
													onChange={(e) =>
														setEditedStock({
															...editedStock,
															productQuantity:
																e.target.value,
														})
													}
												/>
											) : (
												stockItem.productQuantity
											)}
										</td>
										<td>
											{stockItem.productName ===
											editProductName ? (
												<input
													className="stock-edit-field"
													type="text"
													value={
														editedStock.costPrice
													}
													onChange={(e) =>
														setEditedStock({
															...editedStock,
															costPrice:
																e.target.value,
														})
													}
												/>
											) : (
												stockItem.costPrice
											)}
										</td>
										<td>
											{stockItem.productName ===
											editProductName ? (
												<input
													className="stock-edit-field"
													type="text"
													value={
														editedStock.sellingPrice
													}
													onChange={(e) =>
														setEditedStock({
															...editedStock,
															sellingPrice:
																e.target.value,
														})
													}
												/>
											) : (
												stockItem.sellingPrice
											)}
										</td>
										{role === "Admin" && (
											<td>
												{stockItem.productName ===
												editProductName ? (
													<div className="stock-edited-button">
														<button
															className="stock-save-button"
															onClick={() =>
																handleSaveConfirmation(
																	stockItem.productName
																)
															}
														>
															Save
														</button>
														<button
															className="stock-cancel-button"
															onClick={() =>
																handleCancelEdit()
															}
														>
															Cancel
														</button>
													</div>
												) : (
													<div className="stock-actions">
														<button
															className="stock-edit-button"
															onClick={() =>
																handleEdit(
																	stockItem.productName
																)
															}
														>
															Edit
														</button>
														<button
															className="stock-delete-button"
															onClick={() =>
																handleDeleteConfirmation(
																	stockItem.productName
																)
															}
														>
															Delete
														</button>
													</div>
												)}
											</td>
										)}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
			{showSaveConfirmation && (
				<SaveConfirmation
					onSaveConfirmed={() => handleConfirmSave()}
					onCancel={() => setShowSaveConfirmation(false)}
				/>
			)}
			{showDeleteConfirmation && (
				<DeleteConfirmation
					onDelete={() => handleConfirmDelete()}
					onCancel={() => handleCancelDelete()}
				/>
			)}
		</div>
	);
};

export default StockManagement;
