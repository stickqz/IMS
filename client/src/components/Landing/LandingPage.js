import React, { useState } from "react";
import classes from "./LandingPage.module.css";
import LoginForm from "../Form/LoginForm";
import bg from "../../assets/bg.jpg";

const LandingPage = () => {
	const [adminLogin, setAdminLogin] = useState(false);
	const [userLogin, setUserLogin] = useState(false);
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
		<React.Fragment>
			<div className={classes.img}>
				<img className={classes.image} alt="img" src={bg} />
			</div>
			<div className={classes.front}>
				<button onClick={adminLoginHandler}>Admin Login</button>
				<button onClick={userLoginHandler}>User Login</button>
				<button onClick={adminSignupHandler}>Admin Signup</button>
				<div className={classes.wrapper}>
					{userLogin && <LoginForm name={"User Login"} />}
					{adminLogin && <LoginForm name={"Admin Login"} />}
					{adminSignup && <LoginForm name={"Admin Signup"} />}
				</div>
			</div>
		</React.Fragment>
	);
};

export default LandingPage;
