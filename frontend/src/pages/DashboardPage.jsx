import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import logoutIcon from "../assets/logout-icon.png";
import { UserDetails } from "../components/UserDetails";
import { logoutUser } from "../features/userSlice";

export const DashboardPage = () => {
  const {
    userData: { requestedPayments, transactions },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    localStorage.clear();
    toast.success("Logged Out");
    navigate("/");
  };

  return (
    <div className="w-[800px] m-auto px-5 max-[800px]:w-full">
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
      <div className="grid grid-cols-2 gap-2 mt-5">
        <button className="bg-blue-400 w-full p-1 py-2 px-2 rounded font-semibold hover:bg-blue-500/90 transition-all">
          Pay / Request
        </button>
        <button className="bg-yellow-400 w-full p-1 py-2 px-2 rounded font-semibold hover:bg-yellow-500/90 transition-all">
          Transactions ({transactions?.length})
        </button>
        <button className="bg-green-400 w-full p-1 py-2 px-2 rounded font-semibold hover:bg-green-500/90 transition-all">
          Add Money
        </button>
        <button className="bg-red-400 w-full p-1 py-2 px-2 rounded font-semibold hover:bg-red-500/90 transition-all">
          Requested Payments ({requestedPayments?.length})
        </button>
      </div>
    </div>
  );
};
