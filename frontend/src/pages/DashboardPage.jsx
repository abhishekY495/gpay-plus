import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { API_URL } from "../utils/constants";
import logoutIcon from "../assets/logout-icon.png";

export const DashboardPage = () => {
  const navigate = useNavigate();

  const checkUserLoggedIn = async () => {
    try {
      const response = await axios.get(API_URL + "user/authenticate", {
        withCredentials: true,
      });
      const data = response?.data;
      console.log(data);
    } catch (error) {
      navigate("/login");
    }
  };

  const logoutHandler = async () => {
    const toastId = toast.loading("Logging In");
    try {
      const response = await axios.post(API_URL + "user/logout", "", {
        withCredentials: true,
      });
      toast.success(response?.data?.message, { id: toastId });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message, { id: toastId });
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <div>
      <img src={logoutIcon} alt="logout" onClick={logoutHandler} />
    </div>
  );
};
