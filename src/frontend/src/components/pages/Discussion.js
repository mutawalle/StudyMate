import React, { useState, useEffect } from "react";
import BrowseTopics from "../BrowseTopics";
import ActivityLog from "../ActivityLog";
import StudyRooms from "../StudyRooms";
import { GrClose } from "react-icons/gr";
import CreateRoom from "../CreateRoom";
import axios from "axios";

const Discussion = () => {
  const [modal, setModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [usedRooms, setUsedRooms] = useState([]);
  const [increment, setIncrement] = useState(1);

  const toggleModal = () => {
    setModal(!modal);
  };

  const changeRoom = (value) => {
    if (value === "All") {
      console.log(rooms);
      setUsedRooms(rooms);
    } else {
      setUsedRooms(rooms.filter((e) => e.topic === value));
    }
    setIncrement(1);
  };

  useEffect(() => {
    axios
      .get("https://studymate-data.herokuapp.com/api/get-rooms")
      .then((res) => {
        // Nanti mau dibikin pagination gitu buat roomnya
        setRooms(res.data.reverse());
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setUsedRooms(rooms);
  }, [rooms]);

  return (
    <>
      {modal && (
        <div className="fixed min-h-screen w-screen">
          <div
            className="fixed w-full h-full p-0 bg-black/[0.6]"
            onClick={toggleModal}
          ></div>
          <div className="fixed top-1/2 left-1/2 z-50 bg-[#fff] rounded-xl w-[350px] sm:w-1/2 -translate-y-1/2 -translate-x-1/2">
            <div className="bg-[#FFCC85] p-5 rounded-t-xl text-xl">
              <h1 className="flex items-center justify-between font-bold">
                Create Room{" "}
                <button onClick={toggleModal}>
                  <GrClose />
                </button>
              </h1>
            </div>
            <CreateRoom />
          </div>
        </div>
      )}
      <div className="bg-[#F58F00] min-h-screen py-5 px-6">
        <div className="flex flex-col md:flex-row text-[#fff] ">
          <BrowseTopics changeRoom={changeRoom} rooms={rooms} />
          <StudyRooms
            onClick={toggleModal}
            rooms={usedRooms}
            increment={increment}
            setIncrement={setIncrement}
          />
          <ActivityLog />
        </div>
      </div>
    </>
  );
};

export default Discussion;
