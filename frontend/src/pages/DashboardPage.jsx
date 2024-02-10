import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import logoutIcon from "../assets/logout-icon.png";
import { logoutUser } from "../features/userSlice";

export const DashboardPage = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    localStorage.clear();
    toast.success("Logged Out");
    navigate("/");
  };

  return (
    <div>
      <p>Full Name: {userData?.fullname}</p>
      <p>Username: {userData?.username}</p>
      <p>Email: {userData?.email}</p>

      <img src={logoutIcon} alt="logout" onClick={logoutHandler} />
    </div>
  );
};
