import React from "react";

import { formatDate } from "../utils/formatDate";
import { formatAmount } from "../utils/formatAmount";

export const SentRequest = ({ request }) => {
  const { username, fullname, status, amount, createdAt } = request;

  const statusBgColor =
    status === "PENDING"
      ? "bg-blue-100/20"
      : status === "PAID"
      ? "bg-green-100/20"
      : "bg-red-100/20";

  const textColor =
    status === "PENDING"
      ? "text-blue-500"
      : status === "PAID"
      ? "text-green-500"
      : "text-red-500";

  return (
    <div
      className={`flex justify-between items-center ${statusBgColor} p-2 pb-3 px-4 rounded-md hover:cursor-pointer`}
    >
      <div>
        <p className="text-xl font-bold max-[430px]:text-lg">{fullname}</p>
        <p className="text-sm -mt-1">@{username}</p>
        <p className="text-sm">{formatDate(createdAt)}</p>
      </div>
      <p className={`text-lg ${textColor} font-semibold max-[430px]:text-base`}>
        {formatAmount(amount)}
      </p>
    </div>
  );
};
