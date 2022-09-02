import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Log = ({ log }) => {
  const [room, setRoom] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://studymate-data.herokuapp.com/api/get-room/?_id=${log.roomId}`
      )
      .then((res) => setRoom(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="border bg-white md:border-[#FFCC85] text-[#000] rounded-md px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="">
          <CgProfile size={30} color={"#000"} />
        </div>
        <div className="">
          <Link
            to={"/profile/" + log.sender}
            className="text-[12px] font-bold text-[#5E39C4]"
          >
            @{log.sender}
          </Link>
          <p className="text-[12px] text-[#000]">at {log.date}</p>
        </div>
      </div>
      <p className="text-sm my-1">
        in{" "}
        <Link className="text-[#5E39C4] font-bold" to={"/room"} state={room}>
          {room && room.name}
        </Link>
      </p>
      <div className="bg-[#FFCC85] px-2 py-1 rounded-sm text-sm mb-1">
        {log.pesan}
      </div>
    </div>
  );
};

export default Log;
