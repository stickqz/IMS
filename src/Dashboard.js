import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateOrder from "./CreateOrder";
import EmployeeManagement from "./EmployeeManagement";
import StockManagement from "./StockManagement";
import SalesHistory from "./SalesHistory";
import Billing from "./Billing";
import "./styles.css";

const Dashboard = () => {
	return (
		<div className="dashboard">
			<Routes>
				<Route path="/create-order" component={CreateOrder} />
				<Route
					path="/employee-management"
					component={EmployeeManagement}
				/>
				<Route path="/stock-management" component={StockManagement} />
				<Route path="/sales-history" component={SalesHistory} />
				<Route path="/billing" component={Billing} />
			</Routes>
		</div>
	);
};

export default Dashboard;
