import React from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
const Pagination = ({ increment, nextPage, previousPage }) => {
  return (
    <div className="flex items-center text-white">
      <button onClick={previousPage}>
        <MdNavigateBefore size={40} />
      </button>
      <h1 className="text-2xl">{increment}</h1>
      <button onClick={nextPage}>
        <MdNavigateNext size={40} />
      </button>
    </div>
  );
};

export default Pagination;
