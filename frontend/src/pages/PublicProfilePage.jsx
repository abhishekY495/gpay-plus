import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

import { appLink, API_URL } from "../utils/constants";

export const PublicProfilePage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const PROFILE_API_URL = API_URL + `user/${username}`;
  const publicProfileLink = appLink + "user/" + userData?.username;

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

  useEffect(() => {
    getProfileDetails();
  }, []);

  return (
    <div className="w-[340px] m-auto mt-4 p-3 pb-4 rounded-md bg-neutral-100">
      {loading && <p className="text-center">Getting Profile Details</p>}
      {userData && (
        <>
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
            <button className="bg-green-500 text-white font-semibold p-1 rounded hover:opacity-90">
              Pay
            </button>
            <button className="bg-red-500 text-white font-semibold p-1 rounded hover:opacity-90">
              Request
            </button>
          </div>
        </>
      )}
    </div>
  );
};
