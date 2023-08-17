import React, { useState } from "react";
import Navbar from "./Navbar";
import CreateOrder from "./CreateOrder";
import EmployeeManagement from "./EmployeeManagement";
import StockManagement from "./StockManagement";
import SalesHistory from "./SalesHistory";
import Billing from "./Billing";
import "./styles.css";

const App = () => {
	const [selectedComponent, setSelectedComponent] = useState(null);

	const renderComponent = () => {
		switch (selectedComponent) {
			case "create-order":
				return <CreateOrder />;
			case "employee-management":
				return <EmployeeManagement />;
			case "stock-management":
				return <StockManagement />;
			case "sales-history":
				return <SalesHistory />;
			case "billing":
				return <Billing />;
			default:
				return null;
		}
	};

	return (
		<div className="app">
			<div className="navbar-container">
				<Navbar onSelectComponent={setSelectedComponent} />
			</div>
			<div className="dashboard">{renderComponent()}</div>
		</div>
	);
};

export default App;
