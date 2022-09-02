import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import webtitle from "../assets/LogoTypography.png";

const Navbar = ({ user, logout }) => {
  const [menu, setMenu] = useState(false);

  return (
    <div className="flex h-[80px] items-center sticky top-0 z-50 py-2 md:py-4 px-6 md:px-12 shadow-xl bg-[#fff]">
      {/* Logo */}
      <Link to="/">
        <img src={webtitle} alt="wave" className="h-12" />
      </Link>

      {/* Profile */}
      <div className="flex flex-grow justify-end items-center gap-2">
        <div className="">
          {user && (
            <Link to={`/myprofile`} state={user}>
              <CgProfile size={30} color={"#000"} />
            </Link>
          )}
        </div>
        {user ? (
          <>
            <div className="">
              <h3 className="">{user.name}</h3>
              <p className="text-[12px] text-[#44288F]">@{user.username}</p>
            </div>
            <button onClick={() => setMenu(!menu)}>
              <BsChevronDown />
            </button>
          </>
        ) : (
          <Link to="/login" className="flex justify-center">
            <button className="rounded-full px-6 py-2 bg-[#5E39C4] hover:bg-[#9881DA] text-[#fff] transition duration-200">
              Login
            </button>
          </Link>
        )}

        {/* Menu */}
        {menu && user && (
          <div className="absolute rounded-lg -bottom-[60px] w-[160px] bg-[#44288F] text-sm transition duration-200 shadow-md">
            <div className="flex flex-col text-[#fff] divide-y-[1px]">
              <button className="flex items-center justify-center gap-1  px-4 py-2 rounded-t-lg hover:bg-[#9881DA] ">
                <IoSettingsOutline />
                <Link to="/settings"> Settings </Link>
              </button>
              <button
                className="flex items-center justify-center gap-1 px-4 py-2 rounded-b-lg hover:bg-[#9881DA] "
                onClick={logout}
              >
                <FiLogOut />
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
