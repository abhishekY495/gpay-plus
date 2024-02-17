import React from "react";

import { formatDate } from "../utils/formatDate";
import { formatAmount } from "../utils/formatAmount";

export const SentRequest = ({ request }) => {
  const { username, fullname, status, amount, createdAt } = request;

  const statusBgColor =
    status === "PENDING"
      ? "bg-blue-400"
      : status === "PAID"
      ? "bg-green-400"
      : "bg-red-400";

  return (
    <div className="flex justify-between items-center odd:bg-neutral-100 p-2 pb-3 px-4 rounded-md hover:cursor-pointer">
      <div>
        <p className="text-xl font-bold max-[430px]:text-lg">{fullname}</p>
        <p className="text-sm -mt-1">@{username}</p>
        <p className="text-sm">{formatDate(createdAt)}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold max-[430px]:text-base">
          {formatAmount(amount)}
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
