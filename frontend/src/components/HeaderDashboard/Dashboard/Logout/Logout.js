import React from "react";
import "../../styles.css";
import "./Logout.css";

const Logout = () => {
	return (
		<div className="component-container">
			<h2 className="component-heading">Are you Sure?</h2>
			<button type="submit" className="submit-button">
				Logout
			</button>
		</div>
	);
};

export default Logout;
