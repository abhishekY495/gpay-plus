import React from "react";

import { formatDate } from "../utils/formatDate";

export const RequestedPayment = ({ requestedPayment }) => {
  const { username, fullname, status, amount, createdAt } = requestedPayment;

  const statusBgColor =
    status === "PENDING"
      ? "bg-blue-300"
      : status === "PAID"
      ? "bg-green-300"
      : "bg-red-300";

  return (
    <div className="flex justify-between items-center even:bg-neutral-100 p-2 pb-3 px-4 rounded-md hover:cursor-pointer">
      <div>
        <p className="text-xl font-bold max-[430px]:text-lg">{fullname}</p>
        <p className="text-sm -mt-1">@{username}</p>
        <p className="text-sm">{formatDate(createdAt)}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold max-[430px]:text-base">
          <span className="mr-[2px]">₹</span>
          {(amount / 100).toFixed(2)}
        </p>
        <span
          className={`${statusBgColor} px-5 py-1 rounded font-semibold hover:cursor-pointer hover:opacity-90`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};
