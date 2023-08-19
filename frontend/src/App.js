import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Form/Register.js";
import LandingPage from "./components/Landing/LandingPage.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/register" element={<Register />} />
				<Route element={<PrivateRoute />}>
					<Route element={<Dashboard />} path="/dashboard" />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
