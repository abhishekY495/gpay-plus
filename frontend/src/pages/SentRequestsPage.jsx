import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { API_URL } from "../utils/constants";
import { SentRequest } from "../components/SentRequest";
import { RequestFilterOptions } from "../components/RequestFilterOptions";

export const SentRequestsPage = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [filteredSentRequests, setFilteredSentRequests] = useState([]);
  const [filter, setFilter] = useState("PENDING");
  const [pendingCount, setPendingCount] = useState(0);
  const [paidCount, setPaidCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { userToken } = useSelector((state) => state.user);
  const SENT_REQUESTS_API_URL = API_URL + "user/sent-requests";

  const getSentRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(SENT_REQUESTS_API_URL, {
        headers: { Authorization: userToken },
      });
      const data = await response?.data;
      setSentRequests(data);
      const pendingRequests = data?.filter(
        ({ status }) => status === "PENDING"
      );
      const paidRequests = data?.filter(({ status }) => status === "PAID");
      const rejectedRequests = data?.filter(
        ({ status }) => status === "REJECTED"
      );
      setPendingCount(pendingRequests?.length);
      setPaidCount(paidRequests?.length);
      setRejectedCount(rejectedRequests?.length);
      setFilteredSentRequests(pendingRequests);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const filterRequestsBy = (status) => {
    setFilter(status);
    const requests = sentRequests?.filter(
      (request) => request?.status === status
    );
    setFilteredSentRequests(requests);
  };

  useEffect(() => {
    getSentRequests();
    filterRequestsBy(filter);
  }, []);

  return (
    <div className="w-[800px] m-auto px-5 max-[800px]:w-full flex flex-col gap-2">
      <h2 className="text-center text-4xl mt-3 mb-1 pb-1 font-bold border-b max-[435px]:text-3xl">
        Sent Requests
      </h2>
      {loading && <p className="px-2 text-center mt-3">Loading ...</p>}
      {sentRequests?.length !== 0 && (
        <RequestFilterOptions
          filter={filter}
          filterRequestsBy={filterRequestsBy}
          pendingCount={pendingCount}
          paidCount={paidCount}
          rejectedCount={rejectedCount}
        />
      )}
      {!loading && filteredSentRequests?.length === 0 && (
        <p className="px-2 text-center mt-3">No Requests</p>
      )}
      {filteredSentRequests
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((request) => {
          return <SentRequest request={request} key={request?._id} />;
        })}
    </div>
  );
};
