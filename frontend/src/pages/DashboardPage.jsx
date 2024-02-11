import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import logoutIcon from "../assets/logout-icon.png";
import { UserDetails } from "../components/UserDetails";
import { logoutUser } from "../features/userSlice";

export const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    localStorage.clear();
    toast.success("Logged Out");
    navigate("/");
  };

  return (
    <div className="w-[600px] m-auto px-3 max-[600px]:w-full">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-4xl font-bold my-4 mb-2 max-[430px]:text-3xl">
          Dashboard
        </h2>
        <img
          src={logoutIcon}
          onClick={logoutHandler}
          alt="logout"
          className="w-10 hover:cursor-pointer hover:scale-[1.1] transition-all"
          title="Logout"
        />
      </div>
      <UserDetails />
    </div>
  );
};
