import React, { useState } from "react";
import "../../styles.css";
import AddEmployee from "./AddEmployee";
const employee = {
	addEmp: "Add",
	editEmp: "Edit",
	rmvEmp: "Remove",
};

const EmployeeManagement = () => {
	const [manageEmployee, setManageEmployee] = useState();

	const addHandler = () => {
		setManageEmployee(employee.addEmp);
	};
	const editHandler = () => {
		setManageEmployee(employee.editEmp);
	};
	const removeHandler = () => {
		setManageEmployee(employee.rmvEmp);
	};

	return (
		<div className="component-container">
			<h2 className="component-heading">Employee Management</h2>
			{/* List of employees */}
			<ul className="employee-list">
				<li>John Doe</li>
				<li>Jane Smith</li>
				<li>Michael Johnson</li>
			</ul>
			<div className="button-container">
				<button onClick={addHandler} className="add-button">
					Add Employee
				</button>
				<button onClick={editHandler} className="edit-button">
					Edit Employee
				</button>
				<button onClick={removeHandler} className="remove-button">
					Remove Employee
				</button>
			</div>
			{manageEmployee === "Add" && <AddEmployee />}
		</div>
	);
};

export default EmployeeManagement;
