import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { appLink, API_URL } from "../utils/constants";
import { Shimmer } from "../components/Shimmer";
import { PayModal } from "../components/Modals/PayModal";
import { RequestModal } from "../components/Modals/RequestModal";

export const PublicProfilePage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [payOpenModal, setPayOpenModal] = useState(false);
  const [requestOpenModal, setRequestOpenModal] = useState(false);
  const { userData: loggedInUserData } = useSelector((state) => state?.user);
  const PROFILE_API_URL = API_URL + `user/${username}`;
  const publicProfileLink = appLink + "user/" + userData?.username;
  const navigate = useNavigate();
  const location = useLocation();

  const getProfileDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(PROFILE_API_URL);
      const data = await response?.data;
      setUserData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const payBtnHandler = () => {
    if (!loggedInUserData) {
      toast.error("Log in to Pay");
      navigate("/login", { state: { prevUrl: location?.pathname } });
      return;
    }
    if (loggedInUserData?.username === username) {
      toast.error("Cannot pay to Self");
      return;
    }
    setPayOpenModal(true);
  };
  const requestBtnHandler = () => {
    if (!loggedInUserData) {
      toast.error("Log in to Request");
      navigate("/login", { state: { prevUrl: location?.pathname } });
      return;
    }
    if (loggedInUserData?.username === username) {
      toast.error("Cannot request from Self");
      return;
    }
    setRequestOpenModal(true);
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  return (
    <>
      {loading && <Shimmer />}
      {!loading && !userData?.username && (
        <p className="text-center mt-6 font-bold text-3xl">No such profile</p>
      )}
      {userData?.username && (
        <div className="w-[340px] m-auto mt-4 p-3 pb-4 rounded-md bg-neutral-200">
          <PayModal
            payOpenModal={payOpenModal}
            setPayOpenModal={setPayOpenModal}
            payToUsername={username}
          />
          <RequestModal
            requestOpenModal={requestOpenModal}
            setRequestOpenModal={setRequestOpenModal}
            requestFromUsername={username}
          />
          <div className="flex flex-col items-center gap-1 mb-2">
            <p className="text-3xl font-semibold text-center">
              {userData?.fullname}
            </p>
            <QRCodeCanvas
              value={publicProfileLink}
              size={260}
              className="p-3 bg-white rounded-md"
            />
            <p className="font-bold">@{userData?.username}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="bg-green-400 border-2 border-green-500 font-semibold p-1 rounded hover:opacity-80"
              onClick={payBtnHandler}
            >
              Pay
            </button>
            <button
              className="bg-red-400 border-2 border-red-500 font-semibold p-1 rounded hover:opacity-90"
              onClick={requestBtnHandler}
            >
              Request
            </button>
          </div>
        </div>
      )}
    </>
  );
};
