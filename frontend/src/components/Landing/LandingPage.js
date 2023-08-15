import React, { useState } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom"; // Import useHistory
import axios from "axios"; // Import Axios

function LandingPage() {
  const [activeTab, setActiveTab] = useState("loginAdmin");
  const [loginError, setLoginError] = useState(null); // State for error message

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    let loginSuccess = false; // Flag to track successful login

    try {
      if (activeTab === "loginAdmin") {
        const response = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
        });
        if (response.status === 200) {
          console.log("Admin login successful");
          loginSuccess = true;
        }
      } else if (activeTab === "loginUser") {
        const response = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
        });
        if (response.status === 200) {
          console.log("User login successful");
          loginSuccess = true;
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }

    if (loginSuccess) {
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } else {
      // Display error message
      setLoginError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="firsthalf">
        <h1> Login to Your Account</h1>
        <div className="tabs">
          <div className="tab-label">Admin</div>
          <label
            className={`switch ${activeTab === "loginUser" ? "user" : "admin"}`}
          >
            <input
              type="checkbox"
              onChange={() =>
                handleTabChange(
                  activeTab === "loginAdmin" ? "loginUser" : "loginAdmin"
                )
              }
            />
            <span className="slider"></span>
          </label>
          <div className="tab-label">User</div>
        </div>
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <label className="name-field">Email :</label>
            <input type="text" name="email" placeholder="Enter Email" />
            <br />
            <label className="name-field">Password :</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
            />
            <br />
            {loginError && <p className="error">{loginError}</p>}
            <button type="submit" className="login-button">
              {activeTab === "loginAdmin" ? "Login As Admin" : "Login As User"}
            </button>
          </form>
        </div>
      </div>
      <div className="secondhalf">
        <h3>New Here?</h3>
        <p>
          Sign Up and discover a great
          <br /> amount of new Opportunities!
        </p>
        <div className="button-container">
          <Link to="/signup">
            <button className={`create-account-button `}>Create Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
