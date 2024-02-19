import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { API_URL } from "../utils/constants";
import { ReceivedRequest } from "../components/ReceivedRequest";

export const ReceivedRequestsPage = () => {
  const { userToken, userData } = useSelector((state) => state.user);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const RECEIVED_REQUESTS_API_URL = API_URL + "user/received-requests";

  const getReceivedRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(RECEIVED_REQUESTS_API_URL, {
        headers: { Authorization: userToken },
      });
      const data = await response?.data;
      setReceivedRequests(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReceivedRequests();
  }, [userData?.receivedRequests]);

  return (
    <div className="w-[800px] m-auto px-5 max-[800px]:w-full flex flex-col gap-2">
      <h2 className="text-center text-4xl mt-3 mb-1 pb-1 font-bold border-b max-[435px]:text-3xl">
        Received Requests{" "}
        <span className="text-xl">({userData?.receivedRequests})</span>
      </h2>
      {loading && receivedRequests.length === 0 && (
        <p className="px-2 text-center mt-3">Loading ...</p>
      )}
      {!loading && receivedRequests.length === 0 && (
        <p className="px-2 text-center mt-3">No Requests</p>
      )}
      <div className="grid grid-cols-2 gap-2 max-[560px]:grid-cols-1">
        {receivedRequests
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((request) => {
            return <ReceivedRequest request={request} key={request?._id} />;
          })}
      </div>
    </div>
  );
};
