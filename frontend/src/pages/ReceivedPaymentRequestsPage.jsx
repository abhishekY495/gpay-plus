import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { API_URL } from "../utils/constants";
import { ReceivedPaymentRequest } from "../components/ReceivedPaymentRequest";

export const ReceivedPaymentRequestsPage = () => {
  const { userToken, userData } = useSelector((state) => state.user);
  const [receivedPaymentRequests, setReceivedPaymentRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const RECEIVED_PAYMENT_REQUESTS_API_URL =
    API_URL + "user/received-payment-requests";

  const getReceivedPaymentRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(RECEIVED_PAYMENT_REQUESTS_API_URL, {
        headers: { Authorization: userToken },
      });
      const data = await response?.data;
      setReceivedPaymentRequests(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReceivedPaymentRequests();
  }, []);

  return (
    <div className="w-[800px] m-auto px-5 max-[800px]:w-full flex flex-col gap-2">
      <h2 className="text-center text-4xl mt-3 mb-1 pb-1 font-bold border-b max-[435px]:text-3xl">
        Received Payment Requests{" "}
        <span className="text-xl">({userData?.receivedPaymentRequests})</span>
      </h2>
      {loading && <p className="px-2 text-center mt-3">Loading ...</p>}
      {!loading && receivedPaymentRequests.length === 0 && (
        <p className="px-2 text-center mt-3">Nothing to show</p>
      )}
      <div className="grid grid-cols-2 gap-2">
        {receivedPaymentRequests
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((receivedPaymentRequest) => {
            return (
              <ReceivedPaymentRequest
                receivedPaymentRequest={receivedPaymentRequest}
                key={receivedPaymentRequest?._id}
              />
            );
          })}
      </div>
    </div>
  );
};
