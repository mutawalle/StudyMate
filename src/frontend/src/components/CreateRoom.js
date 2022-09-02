import React, { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateRoom() {
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (topic.toLowerCase() !== "all") {
      axios
        .post("https://studymate-data.herokuapp.com/api/create-room", {
          topic: topic,
          name: name,
          description: description,
          user: JSON.parse(localStorage.getItem("user")).username,
        })
        .then((res) => console.log(res.data))
        .then((err) => console.log(err));
    } else {
      alert("Wrong input!");
    }
  };

  return (
    <div className="p-5">
      <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
        <TextField
          label="Room Topic"
          required
          error={topic.toLowerCase() === "all"}
          onChange={(e) => setTopic(e.target.value)}
        />
        <TextField
          label="Room Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Room Description"
          multiline
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="submit"
          value="Create Room"
          className="rounded-lg px-4 py-2 text-[#fff] bg-[#5E39C4] hover:bg-[#9881DA] transition duration-200 shadow-md cursor-pointer"
        />
      </form>
    </div>
  );
}

export default CreateRoom;
