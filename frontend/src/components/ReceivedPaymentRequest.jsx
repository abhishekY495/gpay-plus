import React from "react";

import { formatDate } from "../utils/formatDate";

export const ReceivedPaymentRequest = ({ receivedPaymentRequest }) => {
  const { username, fullname, amount, createdAt } = receivedPaymentRequest;

  return (
    <div className="bg-neutral-100 p-3 px-5 rounded-md hover:cursor-pointer hover:bg-neutral-200/60 transition-all">
      <p className="text-xl font-bold max-[430px]:text-lg">{fullname}</p>
      <p className="text-sm -mt-1">@{username}</p>
      <p className="text-sm">{formatDate(createdAt)}</p>
      <p className="text-2xl font-semibold my-1">
        <span className="mr-[2px]">₹</span>
        {(amount / 100).toFixed(2)}
      </p>
      <div className="flex gap-2">
        <button className="w-full bg-green-500 px-5 py-1 rounded font-semibold hover:cursor-pointer hover:bg-green-500/90 text-white">
          Pay
        </button>
        <button className="w-full bg-red-500 px-5 py-1 rounded font-semibold hover:cursor-pointer hover:bg-red-500/90 text-white">
          Reject
        </button>
      </div>
    </div>
  );
};
