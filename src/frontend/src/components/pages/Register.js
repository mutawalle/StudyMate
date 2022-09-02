import React, { useState } from "react";
import { TextField } from "@mui/material";
import { users } from "../../db";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length >= 8) {
      axios
        .post("https://studymate-data.herokuapp.com/api/register", {
          name,
          username,
          password,
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/");
          window.location.reload();
        })
        .catch((err) => alert(err));
    } else {
      alert("Password should be minimum 8 characters");
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="w-1/2 mt-10 bg-[#F58F00] rounded-xl">
        <h1 className="p-5 text-center font-bold rounded-t-xl text-3xl bg-[#FFCC85]">
          Register
        </h1>
        <form className="flex flex-col p-5 space-y-5 " onSubmit={handleSubmit}>
          <TextField
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <TextField
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type={"password"}
            value={password}
            error={password.length < 8}
            required
          />
          <input
            type="submit"
            value="Register"
            className="rounded-lg px-4 py-2 text-[#fff] bg-[#5E39C4] hover:bg-[#9881DA] transition duration-200 shadow-md cursor-pointer"
          />
        </form>
        <div className="flex flex-col items-center px-5 pb-5">
          <h1>Already have an account?</h1>
          <Link className="underline text-[#5E39C4] font-bold" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
