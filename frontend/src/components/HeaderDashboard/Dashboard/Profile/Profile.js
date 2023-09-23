import React, { useEffect, useState } from "react";
import "./Profile.css";
import profileImage from "./profile.jpg";
import axios from "axios";

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
      <div className="top-section">
        <div className="profile-section">
          <img src={profileImage} alt="Profile" className="profile-photo" />
          <p className="profileData-username">{profileData.username}</p>
          <p className="profileData-email">Email: {profileData.email}</p>
          <p className="profileData-shopName">
            Shop Name: {profileData.shopName}
          </p>
          {profileData.role === "Admin" && <p>Phone: {profileData.phone}</p>}
          {profileData.role === "employee" && (
            <p className="profileData-salary">Salary: {profileData.salary}</p>
          )}
        </div>
        <div className="sells-details">
          <div className="grid-container">
            <div className="sells-card">
              <h3>Net Stock</h3>
              <p className="sells">{profileData.netStock}</p>
            </div>
            <div className="sells-card">
              <h3>Net Sells</h3>
              <p className="sells">{profileData.netSales}</p>
            </div>
            <div className="sells-card">
              <h3>Net Profit</h3>
              <p className="sells">{profileData.profit}</p>
            </div>
            <div className="sells-card">
              <h3>Total Employees</h3>
              <p className="sells">{profileData.totalEmployees}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
