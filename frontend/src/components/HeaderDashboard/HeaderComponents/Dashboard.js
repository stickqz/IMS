import React, { useState } from "react";
import CreateOrder from "../StockManagement/CreateOrder";
import EmployeeManagement from "../EmployeeManagement/EmployeeManagement";
import StockManagement from "../StockManagement/StockManagement";
import SalesHistory from "../SalesHistory/SalesHistory";
import Billing from "./Dashboard/Billing/Billing";
import "../../../styles.css";

const Dashboard = () => {
	const [selectedComponent, setSelectedComponent] = useState(null);

	const handleComponentSelect = (component) => {
		setSelectedComponent(component);
	};

	let renderedComponent;
	switch (selectedComponent) {
		case "create-order":
			renderedComponent = <CreateOrder />;
			break;
		case "employee-management":
			renderedComponent = <EmployeeManagement />;
			break;
		case "stock-management":
			renderedComponent = <StockManagement />;
			break;
		case "sales-history":
			renderedComponent = <SalesHistory />;
			break;
		case "billing":
			renderedComponent = <Billing />;
			break;
		default:
			renderedComponent = null;
	}

	return (
		<div className="dashboard">
			<Navbar onSelectComponent={handleComponentSelect} />
			{renderedComponent}
		</div>
	);
};

export default Dashboard;
