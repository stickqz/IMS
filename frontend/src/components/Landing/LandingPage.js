import React, { useState } from "react";
import classes from "./LandingPage.module.css";
import LoginForm from "../Form/LoginForm";
import Register from "../Form/Register";
import Card from "../UI/Card/Card";

const LandingPage = () => {
	const [adminLogin, setAdminLogin] = useState(false);
	const [userLogin, setUserLogin] = useState(true);
	const [adminSignup, setAdminSignup] = useState(false);

	const adminSignupHandler = () => {
		setAdminSignup(true);
		setAdminLogin(false);
		setUserLogin(false);
	};
	const adminLoginHandler = () => {
		setAdminLogin(true);
		setUserLogin(false);
		setAdminSignup(false);
	};
	const userLoginHandler = () => {
		setAdminLogin(false);
		setAdminSignup(false);
		setUserLogin(true);
	};

	return (
		<div className={classes.container}>
			<Card className={classes.landing}>
				<button className={classes.btn} onClick={adminLoginHandler}>
					Admin Login
				</button>
				<button className={classes.btn} onClick={userLoginHandler}>
					User Login
				</button>
				<button className={classes.btn} onClick={adminSignupHandler}>
					Admin Signup
				</button>
				<div>
					{userLogin && <LoginForm name={"User Login"} />}
					{adminLogin && <LoginForm name={"Admin Login"} />}
					{adminSignup && <Register name={"Admin Signup"} />}
				</div>
			</Card>
		</div>
	);
};

export default LandingPage;
