import React, { useEffect, useState, useRef } from "react";
import BubbleChat from "../BubbleChat";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import io from "socket.io-client";

const socket = io.connect("https://studymate-pesan.herokuapp.com/");

const Room = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isJoined, setIsJoined] = useState(false);
  const [room, setRoom] = useState({});
  const [pesan, setPesan] = useState("");
  const [pesans, setPesans] = useState([]);
  const messagesEndRef = useRef(null);

  // const bubbles = messages.filter(function (el) {
  //   return el.roomId === parseInt(roomId);
  // });

  useEffect(() => {
    setRoom(location.state);
  }, []);

  useEffect(() => {
    if (room.users) {
      setIsJoined(room.users.includes(user.username));
    }
    if (room.users) {
      socket.emit("join-room", room._id);
      axios
        .get(
          `https://studymate-data.herokuapp.com/api/get-pesan/?room=${room._id}`
        )
        .then((res) => setPesans(res.data))
        .catch((err) => console.log(err));
    }
  }, [room]);

  socket.on("receive-message", (data) => {
    if (!pesans.includes(data)) {
      setPesans([...pesans, data]);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pesan !== "") {
      socket.emit(
        "send-message",
        pesan,
        room._id,
        JSON.parse(localStorage.getItem("user")).username
      );
    }
  };

  const handleJoin = (e) => {
    e.preventDefault();

    if (user) {
      axios
        .post("https://studymate-data.herokuapp.com/api/update-room", {
          _id: room._id,
          users: [...room.users, user.username],
        })
        .then((res) => {
          setRoom(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const toggleClass = () => {
    document.querySelector(".participant").classList.toggle("h-0");
    document.querySelector(".participant").classList.toggle("p-2");
  };

  return (
    <div className="bg-[#F58F00] min-h-screen py-4 px-12">
      {/* Room Header */}
      <div className="flex items-center justify-between my-5 text-[#fff] ">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{room.name && room.name}</h1>
          <h1 className="text-xl">{room.description && room.description}</h1>
        </div>

        <div className="flex gap-2">
          {room.users ? (
            room.users[0] === user && (
              <button className="flex items-center gap-2 rounded-lg px-4 py-2 bg-[#ee1818] hover:bg-[#e45c5c] disabled:cursor-not-allowed">
                Delete Room
              </button>
            )
          ) : (
            <></>
          )}
          <button
            disabled={isJoined}
            className="flex items-center gap-2 rounded-lg px-4 py-2 bg-[#5E39C4] hover:bg-[#9881DA] disabled:bg-[#9881DA] disabled:cursor-not-allowed"
            onClick={handleJoin}
          >
            {isJoined ? "Joined" : "Join Room"}
          </button>
        </div>
      </div>

      {/* Host */}
      <div className="flex items-center text-[#fff] mb-2">
        <p>
          HOST:{" "}
          {room.users && (
            <Link to={"/profile/" + room.users[0]} className="text-[#44288F]">
              @{room.users[0]}
            </Link>
          )}
        </p>
      </div>

      <div className="flex flex-col order-2 md:order-first md:flex-row gap-8 text-[#fff]">
        {/* Chat */}
        <div className="flex-grow bg-[#fff] rounded-xl text-[#000] h-[500px] md:w-1/2">
          <div className="p-8 flex flex-col justify-between h-[100%]">
            <div className="space-y-4 overflow-y-auto ">
              {pesans.map((bubble) => (
                <BubbleChat bubble={bubble} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form action="" onSubmit={handleSubmit}>
              <input
                className={
                  "bg-[#FFCC85] w-full px-4 py-2 mt-5 rounded-md placeholder-[#000] disabled:cursor-not-allowed"
                }
                type="text"
                disabled={!isJoined}
                placeholder={
                  isJoined
                    ? "Write your message here"
                    : "You must join the room first"
                }
                onChange={(e) => setPesan(e.target.value)}
              />
            </form>
          </div>
        </div>

        {/* Participants */}
        <div className="flex-1 order-first md:order-2 divide-y-2 h-3/5">
          <div className="bg-[#FFCC85] px-4 py-2 text-[#000] rounded-t-md">
            <div className="flex">
              <h1
                className="text-white md:text-black md:mx-left mx-auto md:cursor-default cursor-pointer"
                onClick={() => toggleClass()}
              >
                PARTICIPANTS
              </h1>
            </div>
          </div>
          <div className="bg-[#fff] participant h-0 md:h-max md:p-2 overflow-hidden rounded-b-md space-y-2">
            {room.users &&
              room.users.map((username) => (
                // <Link to={"/profile/" + username} className="text-[#5E39C4] ">
                <div className="flex items-center gap-2 px-2 py-2">
                  <CgProfile size={30} color={"#000"} />
                  <Link
                    to={"/profile/" + username}
                    style={{ color: "#44288F" }}
                  >
                    @{username}
                  </Link>
                </div>
                // </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
