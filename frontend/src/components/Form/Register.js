import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = (props) => {
	const { register, handleSubmit } = useForm();

	const [userInfo, setUserInfo] = useState();

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				"http://localhost:5000/api/signup",
				data
			);
			console.log("User registered:", response.data);
			setUserInfo(data);
		} catch (error) {
			console.error("Error registering user:", error);
		}
	};

	return (
		<div className="reg-container">
			<div className="reg-firsthalf-reg">
				<h1 className="heading">One of Us?</h1>
				<p className="reg-p">
					If you already have an account,
					<br /> just sign in. we've missed you!
				</p>
				<div className="reg-button-container">
					<Link to="/">
						<button className={`reg-create-account-button-sign`}>
							Sign in
						</button>
					</Link>
				</div>
			</div>
			<div className="reg-secondhalf-reg">
				<h1 className="heading">Create Free Account</h1>
				<div className="reg-signup-form">
					<form onSubmit={handleSubmit(onSubmit)}>
						<label>Username</label>
						<input
							type="text"
							id="username"
							placeholder="username"
							{...register("username", {
								required: "Enter User Name",
							})}
						/>
						<br />
						<label>Email</label>
						<input
							type="text"
							id="email"
							placeholder="example@gmail.com"
							{...register("email", { required: "Enter email" })}
						/>
						<br />
						<label>Password</label>
						<input
							type="password"
							id="password"
							placeholder="********"
							{...register("password", {
								required: "Enter Password",
							})}
						/>
						<br />

						<div className="reg-button-container">
							<button
								type="submit"
								className="reg-create-account-button"
							>
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
