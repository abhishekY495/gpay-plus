import React from "react";
import { Link } from "react-router-dom";

import appIcon from "../assets/app-icon.png";
import dashboardIcon from "../assets/profile-icon.png";

export const Navbar = () => {
  return (
    <nav className="bg-black text-white flex p-4 px-8 justify-center gap-[670px] max-[895px]:justify-between max-[895px]:gap-5">
      <Link to="/" className="flex items-center gap-2">
        <img src={appIcon} alt="gpay plus" className="w-10" />
        <p className="font-bold text-xl">GPay +</p>
      </Link>
      <Link to="/dashboard">
        <img
          src={dashboardIcon}
          alt="profile"
          className="w-9 hover:scale-[1.1] transition-all hover:cursor-pointer"
        />
      </Link>
    </nav>
  );
};
