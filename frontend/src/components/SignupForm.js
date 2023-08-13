import React, { useState } from "react";
import axios from "axios";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending request to:", "/api/signup"); // Add this line
      await axios.post("http://localhost:5000/api/signup", {
        username,
        email,
        password,
      });
      alert("User created successfully");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      alert("An error occurred: " + error.message); // Display the error message
    }
  };

  return (
    <div>
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
