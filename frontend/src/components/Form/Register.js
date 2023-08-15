import classes from "./Register.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import "./signup.css";
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
    <div className="container">
      <div className="firsthalf">
        <h3>One of Us?</h3>
        <p>
          If you already have an account,
          <br /> just sign in. we've missed you!
        </p>
        <div className="button-container">
          <Link to="/">
            <button className={`create-account-button `}>sign in</button>
          </Link>
        </div>
      </div>
      <div className="secondhalf">
        <h1>Create Free Account</h1>
        <div className="signup-form">
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <input
              type="text"
              id="username"
              placeholder="username"
              {...register("username", { required: "Enter User Name" })}
            />
            <br />
            <input
              type="text"
              id="email"
              placeholder="example@gmail.com"
              {...register("email", { required: "Enter email" })}
            />
            <br />
            <input
              type="password"
              id="password"
              placeholder="********"
              {...register("password", { required: "Enter Password" })}
            />
            <br />

            <div className="button-container">
              <button type="submit" className="create-account-button">
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
