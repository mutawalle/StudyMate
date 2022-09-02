import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import RoomsCard from "./RoomsCard";
import Pagination from "./Pagination";

const StudyRooms = ({ onClick, rooms, increment, setIncrement }) => {
  const nextPage = () => {
    if (increment < Math.ceil(rooms.length / 5)) {
      setIncrement(increment + 1);
    }
  };
  const previousPage = () => {
    if (increment > 1) {
      setIncrement(increment - 1);
    }
  };
  return (
    <>
      <div className="md:w-1/2 flex-grow divide-y-2 order-3 md:order-2 m-2">
        <div className="flex items-center justify-between mb-2">
          <div className="">
            <h1 className="font-bold">STUDY ROOMS</h1>
            <p>{rooms.length} rooms available</p>
          </div>
          <Pagination
            increment={increment}
            nextPage={nextPage}
            previousPage={previousPage}
          />
          <div className="flex">
            <button
              className="flex items-center rounded-lg px-4 py-2 bg-[#5E39C4] hover:bg-[#9881DA] transition duration-200 shadow-md"
              onClick={onClick}
            >
              <div className="flex items-center gap-2">
                <AiOutlinePlus /> Create Room
              </div>
            </button>
          </div>
        </div>
        <div className="">
          {rooms.slice((increment - 1) * 5, increment * 5).map((room, id) => (
            <RoomsCard room={room} key={id} />
          ))}
        </div>
      </div>
      <div className="mt-4"></div>
    </>
  );
};

export default StudyRooms;
