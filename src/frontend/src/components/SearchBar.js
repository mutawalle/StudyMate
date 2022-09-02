import React from "react";

const SearchBar = () => {
  return (
    <>
      {/* Search Bar */}
      <div className="flex justify-center flex-grow">
        <form className="form-inline">
          <input
            className="form-control p-2 mr-2 border-black  border-solid border-2 rounded-2xl focus:outline-none placeholder:text-black "
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
    </>
  );
};

export default SearchBar;
