import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { API_URL } from "../utils/constants";
import { SentRequest } from "../components/SentRequest";

export const SentRequestsPage = () => {
  const { userToken, userData } = useSelector((state) => state.user);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const SENT_REQUESTS_API_URL = API_URL + "user/sent-requests";

  const getSentRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(SENT_REQUESTS_API_URL, {
        headers: { Authorization: userToken },
      });
      const data = await response?.data;
      setSentRequests(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSentRequests();
  }, []);

  return (
    <div className="w-[800px] m-auto px-5 max-[800px]:w-full flex flex-col gap-2">
      <h2 className="text-center text-4xl mt-3 mb-1 pb-1 font-bold border-b max-[435px]:text-3xl">
        Sent Requests{" "}
        <span className="text-xl">({userData?.sentRequests})</span>
      </h2>
      {loading && <p className="px-2 text-center mt-3">Loading ...</p>}
      {!loading && sentRequests.length === 0 && (
        <p className="px-2 text-center mt-3">Nothing to show</p>
      )}
      {sentRequests
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((request) => {
          return <SentRequest request={request} key={request?._id} />;
        })}
    </div>
  );
};
