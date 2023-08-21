import React from "react";
import "./AddEmployee.css";

const AddEmployee = ({ onAddEmployee }) => {
	const submitHandler = (e) => {
		e.preventDefault();
		// Gather form data
		const formData = new FormData(e.target);
		const employeeData = {
			name: formData.get("name"),
			email: formData.get("email"),
			password: formData.get("password"),
			phone: formData.get("phone"),
		};
		// Pass employee data to parent component
		onAddEmployee(employeeData);
	};

	return (
		<div className="add-employee-container">
			<h2>Add Employee</h2>
			<form onSubmit={submitHandler} className="add-employee-form">
				<input
					type="text"
					name="name"
					placeholder="Name"
					className="add-employee-input-field"
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					className="add-employee-input-field"
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					className="add-employee-input-field"
				/>
				<input
					type="text"
					name="phone"
					placeholder="Phone"
					className="add-employee-input-field"
				/>
				<button type="submit" className="add-employee-add-button">
					Add
				</button>
			</form>
		</div>
	);
};

export default AddEmployee;
