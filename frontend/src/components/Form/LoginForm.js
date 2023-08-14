import { useForm } from "react-hook-form";

import classes from "./LoginForm.module.css";
import { useState } from "react";

const LoginForm = (props) => {
	const { register, handleSubmit } = useForm();
	const [userInfo, setUserInfo] = useState();
	const onSubmit = (data) => {
		setUserInfo(data);
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
			<pre>{JSON.stringify(userInfo, undefined, 2)}</pre>
			<label>User Name </label>
			<input
				type="text"
				id="username"
				label="UserName"
				placeholder="username"
				{...register("username", { required: true })}
			/>
			<label>Password </label>
			<input
				type="password"
				id="password"
				label="Password"
				placeholder="********"
				{...register("password")}
			/>
			<button className={classes.sigbtn}>Continue</button>
		</form>
	);
};

export default LoginForm;
