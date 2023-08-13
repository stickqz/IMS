import Card from "../UI/Card/Card";

import classes from "./LoginForm.module.css";

const LoginForm = (props) => {
	const formHandler = (e) => {
		e.preventDefault();
	};

	return (
		<Card className={classes.login}>
			<form className={classes.form}>
				<h2>{props.name}</h2>
				<div>
					<label>User Name </label>
					<input type="text" id="username" label="UserName"></input>
				</div>
				<div>
					<label>Password </label>
					<input
						type="password"
						id="password"
						label="Password"
					></input>
				</div>
				<button onClick={formHandler}>Continue</button>
			</form>
		</Card>
	);
};

export default LoginForm;
