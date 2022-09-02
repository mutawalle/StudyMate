import axios from "axios";
import React, { useEffect, useState } from "react";
import Log from "./Log";

const ActivityLog = ({ username }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (username) {
      axios
        .get("https://studymate-data.herokuapp.com/api/get-last-pesan")
        .then((res) =>
          setMessages(
            res.data
              .filter((e) => e.sender === username)
              .slice(-3)
              .reverse()
          )
        );
    } else {
      axios
        .get("https://studymate-data.herokuapp.com/api/get-last-pesan")
        .then((res) => setMessages(res.data.slice(-3).reverse()));
    }
  }, [username]);

  const toggleClass = () => {
    document.querySelector('.activityLog').classList.toggle('h-0')
    document.querySelector('.activityLog').classList.toggle('p-2')
  }

  return (
    <div className="flex-1 divide-y-2 order-2 md:order-3 m-2 min-w-[200px]">
      <div className="shadow-md">
        <div className="md:bg-[#FFCC85] px-4 py-2 text-white md:text-[#000] rounded-t-md">
          <div className="flex font-bold">
            {username ? (
              <h1 className="mx-auto md:mx-0 hover:cursor-pointer md:hover:cursor-default" onClick={() => toggleClass()}>USER RECENT ACTIVITIES</h1>
            ) : (
              <h1 className="mx-auto md:mx-0 hover:cursor-pointer md:hover:cursor-default" onClick={() => toggleClass()}>RECENT ACTIVITIES</h1>
            )}
          </div>
        </div>
        <div className=" border-t-2 md:border-none md:bg-[#fff] rounded-b-md space-y-2 activityLog h-0 md:h-max md:p-2 transition overflow-hidden">
          {messages.length > 0 ? (
            messages.map((log, id) => <Log log={log} key={id} />)
          ) : (
            <div className="text-black rounded-md p-2">
              <p className="italic">No activities</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
