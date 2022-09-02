import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const RoomsCard = ({ room }) => {
  return (
    <>
      <div className="mt-5 p-4 rounded-xl bg-white text-[#F58F00] divide-y shadow-md">
        <div className="pb-2">
          {/* Room header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{room.name}</h1>
            </div>
            <div className="rounded-full bg-[#FFCC85] text-sm text-[#000] px-2 py-1 font-bold">
              {room.topic}
            </div>
          </div>

          {/* Room description */}
          <p className="text-[#000] py-2 group-hover:text-[#fff]">
            {room.description}
          </p>
        </div>

        <div className="flex justify-between pt-2">
          <div className="flex items-center gap-2">
            <BsFillPeopleFill /> {room.users.length} joined
          </div>

          <Link to={"/room"} state={room}>
            <button className="flex items-center gap-2 rounded-lg px-4 py-2 bg-[#5E39C4] hover:bg-[#9881DA] text-[#fff] transition duration-200 shadow-md">
              View Room
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RoomsCard;
