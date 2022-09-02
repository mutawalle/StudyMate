import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import profpic from "../../assets/Logo.png"; /*ini nanti diganti */
import { flexbox } from "@mui/system";

const EditProfile = ({ user }) => {
  const [name, setName] = useState(user ? user.name : "");
  const [username, setUsername] = useState(user ? user.username : "");
  const [bio, setBio] = useState(user ? user.bio : "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/discussion");
  };

  return (
    <div className="flex justify-center bg-[#F58F00] h-screen">
      {user && (
        <div className="mt-10 w-2/3 lg:w-1/2">
          <div className="bg-[#FFFFFF] rounded-xl">
            <h1 className="mb-7 p-3 text-center font-bold rounded-t-xl text-3xl bg-[#FFCC85]">
              Settings
            </h1>

            <div className="p-10">
              <div className="flex md:flex-row flex-col justify-center mb-10 items-center">
                {/* Anggep ini profile picturenya */}
                <img src={profpic} className="h-40 bg-[#FFFFFF]" />

                <div className="flex-col ml-8">
                  <p className="text-3xl font-bold"> {user.name} </p>
                  <p className="text-xl"> @{user.username} </p>
                </div>
              </div>

              <form className="flex flex-col space-y-7" onSubmit={handleSubmit}>
                {/* Change Display Name*/}
                <TextField
                  className="rounded-xl"
                  label="Change name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />

                {/* Change Username */}
                <TextField
                  className="rounded-xl"
                  label="Change username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />

                {/* Change Password */}
                <TextField
                  className="rounded-xl"
                  label="Change bio"
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  multiline
                  rows={4}
                />

                <input
                  type="submit"
                  value="Done"
                  className="rounded-lg px-4 py-2 text-[#fff] bg-[#5E39C4] hover:bg-[#9881DA] transition duration-200 shadow-md cursor-pointer"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
