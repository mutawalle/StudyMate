import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [name, setName] = useState(user ? user.name : "");
  const [username, setUsername] = useState(user ? user.username : "");
  const [bio, setBio] = useState(user ? user.bio : "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://studymate.herokuapp-data.com/api/edit-profile", {
        _id: user._id,
        name,
        old_username: user.username,
        new_username: username,
        bio,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate(`/profile/${username}`);
        window.location.reload();
      })
      .catch((err) => alert("Username already taken"));
  };

  return (
    <div className="flex justify-center bg-[#F58F00] h-screen">
      {user && (
        <div className="mt-10 w-2/3 lg:w-1/2">
          <div className="bg-[#FFFFFF] rounded-xl">
            <h1 className="mb-7 p-3 text-center font-bold rounded-t-xl text-3xl bg-[#FFCC85]">
              Edit Profile
            </h1>

            <div className="p-10">
              <div className="flex justify-center mb-10 items-center">
                {/* Anggep ini profile picturenya */}
                <CgProfile size={175} color={"#000"} />

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

                {/* Change Bio */}
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
