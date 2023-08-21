import React from "react";
import "./Profile.css";
import "../../styles.css";

const Profile = () => {
	// You can fetch the necessary data from an API or use sample data
	const netSales = 1500000; // Replace with actual net sales value
	const netStockPrice = 25.5; // Replace with actual net stock price value
	const netProfit = 450000; // Replace with actual net profit value
	const closeValue = 28.75; // Replace with actual close value

	return (
		<div className="component-container">
			<div>
				<h2>Profile Overview</h2>
				<div className="profile-data">
					<div className="data-entry">
						<span className="data-label">Net Sales</span>
						<span className="data-value">${netSales}</span>
					</div>
					<div className="data-entry">
						<span className="data-label">Net Stock Price</span>
						<span className="data-value">${netStockPrice}</span>
					</div>
					<div className="data-entry">
						<span className="data-label">Net Profit</span>
						<span className="data-value">${netProfit}</span>
					</div>
					<button className="data-entry close-shop">
						<span className="data-label">Close Shop</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
