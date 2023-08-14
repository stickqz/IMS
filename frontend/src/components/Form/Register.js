import classes from "./Register.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

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
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <pre>{JSON.stringify(userInfo, undefined, 2)}</pre>
      <label>User Name </label>
      <input
        type="text"
        id="username"
        label="UserName"
        placeholder="username"
        {...register("username", { required: "Enter User Name" })}
      />
      <label>Email</label>
      <input
        type="text"
        id="email"
        label="Email"
        placeholder="example@gmail.com"
        {...register("email", { required: "Enter email" })}
      />
      <label>Password </label>
      <input
        type="password"
        id="password"
        label="Password"
        placeholder="********"
        {...register("password", { required: "Enter Password" })}
      />
      <button className={classes.sigbtn}>Continue</button>
    </form>
  );
};

export default Register;
