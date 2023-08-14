import React, { useState } from "react";
import classes from "./LandingPage.module.css";
import LoginForm from "../Form/LoginForm";
import Register from "../Form/Register";
import Card from "../UI/Card/Card";

const TABS = {
	AdminLogin: "Admin Login",
	UserLogin: "User Login",
	AdminSignup: "Admin Signup",
};

const LandingPage = () => {
	const [activeTab, setActiveTab] = useState(TABS.AdminLogin);

	const adminSignupHandler = () => {
		setActiveTab(TABS.AdminSignup);
	};
	const adminLoginHandler = () => {
		setActiveTab(TABS.AdminLogin);
	};
	const userLoginHandler = () => {
		setActiveTab(TABS.UserLogin);
	};

	return (
		<div className={classes.container}>
			<Card className={classes.landing}>
				<button
					className={` ${classes.btn} ${
						activeTab === TABS.AdminLogin ? classes.activeBtn : ""
					}`}
					onClick={adminLoginHandler}
				>
					Admin Login
				</button>
				<button
					className={` ${classes.btn} ${
						activeTab === TABS.UserLogin ? classes.activeBtn : ""
					}`}
					onClick={userLoginHandler}
				>
					User Login
				</button>
				<button
					className={` ${classes.btn} ${
						activeTab === TABS.AdminSignup ? classes.activeBtn : ""
					}`}
					onClick={adminSignupHandler}
				>
					Admin Signup
				</button>
				<div>
					{activeTab === TABS.UserLogin && (
						<LoginForm name={"User Login"} />
					)}
					{activeTab === TABS.AdminLogin && (
						<LoginForm name={"Admin Login"} />
					)}
					{activeTab === TABS.AdminSignup && (
						<Register name={"Admin Signup"} />
					)}
				</div>
			</Card>
		</div>
	);
};

export default LandingPage;
