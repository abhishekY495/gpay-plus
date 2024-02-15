import React from "react";

import { formatDate } from "../utils/formatDate";

export const Transaction = ({ transaction }) => {
  const { username, fullname, tag, amount, createdAt } = transaction;

  return (
    <div className="flex justify-between items-center even:bg-neutral-100 p-2 px-4 rounded-md hover:cursor-pointer">
      <div>
        <p className="text-xl font-bold max-[430px]:text-lg">{fullname}</p>
        <p className="text-sm -mt-1">@{username}</p>
        <p className="text-sm">{formatDate(createdAt)}</p>
      </div>
      <p
        className={`text-lg font-semibold max-[430px]:text-base ${
          tag === "PAID" ? "text-red-500" : "text-green-500"
        }`}
      >
        <span className="mr-[2px]">₹</span>
        {(amount / 100).toFixed(2)}
      </p>
    </div>
  );
};
