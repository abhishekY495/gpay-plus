import React from "react";
import { Link } from "react-router-dom";

import appIcon from "../assets/app-icon.png";
import dashboardIcon from "../assets/profile-icon.png";

export const Navbar = () => {
  console.log();
  return (
    <nav className="bg-black text-white flex gap-5 p-4 justify-between px-[100px]">
      <Link to="/" className="flex items-center gap-2">
        <img src={appIcon} alt="gpay plus" className="w-10" />
        <p className="font-bold text-xl">GPay +</p>
      </Link>
      <Link to="/dashboard">
        <img
          src={dashboardIcon}
          alt="profile"
          className="w-10 border-2 border-red-500 rounded-full"
        />
      </Link>
    </nav>
  );
};
