import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdEmail } from "react-icons/md";

import "./Profile.css";
import profileImage from "./profile.png";

const Profile = () => {
	const token = localStorage.getItem("token");
	const [profileData, setProfileData] = useState({});
	useEffect(() => {
		// Fetch user profile data from the server when the component mounts
		axios
			.get("http://localhost:5000/api/Admin/profile", {
				headers: {
					Authorization: `Bearer ${token}`, // Include your authentication token here
				},
			}) // Update this endpoint to the appropriate route
			.then((response) => {
				setProfileData(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error("Error fetching profile data:", error);
			});
	}, [token]);

	return (
		<div className="component-container">
			<h1 className="profile-component-heading">Profile</h1>
			<div className="top-section">
				<div className="profile-section">
					<div className="profile-photo-container">
						<img
							src={profileImage}
							alt="Profile"
							className="profile-photo"
						/>
					</div>
					<p className="profileData-username">
						{profileData.username}
					</p>
					<p className="profileData-email">
						<span className="mail-icon">
							<MdEmail />
						</span>
						{profileData.email}
					</p>
					<p className="profileData-shopName">
						Shop Name: {profileData.shopName}
					</p>
					{profileData.role === "Admin" && (
						<p>Phone: {profileData.phone}</p>
					)}
					{/* {profileData.role === "employee" && (
						<p className="profileData-salary">
							Salary: {profileData.salary}
						</p>
					)} */}
				</div>
				<div className="sells-details">
					<div className="grid-container">
						<div className="sells-card">
							<h3>Net Stock</h3>
							<p className="sells">{profileData.netStock}</p>
						</div>
						<div className="sells-card">
							<h3>Net Sales</h3>
							<p className="sells">{profileData.netSales}</p>
						</div>
						<div className="sells-card">
							<h3>Net Profit</h3>
							<p className="sells">{profileData.profit}</p>
						</div>
						<div className="sells-card">
							<h3>Total Employees</h3>
							<p className="sells">
								{profileData.totalEmployees}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="close-shop">Close Shop</div>
		</div>
	);
};

export default Profile;
