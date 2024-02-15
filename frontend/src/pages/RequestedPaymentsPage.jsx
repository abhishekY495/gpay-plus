import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { API_URL } from "../utils/constants";
import { RequestedPayment } from "../components/RequestedPayment";

export const RequestedPaymentsPage = () => {
  const { userToken, userData } = useSelector((state) => state.user);
  const [requestedPayments, setRequestedPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const REQUESTED_PAYMENTS_API_URL = API_URL + "user/requested-payments";

  const getRequestedPayments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(REQUESTED_PAYMENTS_API_URL, {
        headers: { Authorization: userToken },
      });
      const data = await response?.data;
      setRequestedPayments(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequestedPayments();
  }, []);

  return (
    <div className="w-[800px] m-auto px-5 max-[800px]:w-full flex flex-col gap-2">
      <h2 className="text-center text-4xl mt-3 mb-1 pb-1 font-bold border-b max-[435px]:text-3xl">
        Requested Payments{" "}
        <span className="text-xl">({userData?.requestedPayments})</span>
      </h2>
      {loading && <p className="px-2 text-center mt-3">Loading ...</p>}
      {!loading && requestedPayments.length === 0 && (
        <p className="px-2 text-center mt-3">Nothing to show</p>
      )}
      {requestedPayments
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((requestedPayment) => {
          return (
            <RequestedPayment
              requestedPayment={requestedPayment}
              key={requestedPayment?._id}
            />
          );
        })}
    </div>
  );
};
