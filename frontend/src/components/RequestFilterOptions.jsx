import React from "react";

export const RequestFilterOptions = ({
  filter,
  filterRequestsBy,
  pendingCount,
  paidCount,
  rejectedCount,
}) => {
  return (
    <div className="flex justify-between gap-2">
      <button
        onClick={() => filterRequestsBy("PENDING")}
        className={`w-full p-1 rounded font-semibold bg-blue-300 hover:bg-blue-400/90 ${
          filter === "PENDING" ? "border-2 border-black bg-blue-400/90" : ""
        }`}
      >
        Pending <span className="text-xs">({pendingCount})</span>
      </button>
      <button
        onClick={() => filterRequestsBy("PAID")}
        className={`w-full p-1 rounded font-semibold bg-green-300 hover:bg-green-400/90 ${
          filter === "PAID" ? "border-2 border-black bg-green-400/90" : ""
        }`}
      >
        Paid <span className="text-xs">({paidCount})</span>
      </button>
      <button
        onClick={() => filterRequestsBy("REJECTED")}
        className={`w-full p-1 rounded font-semibold bg-red-300 hover:bg-red-400/90 ${
          filter === "REJECTED" ? "border-2 border-black bg-red-400/90" : ""
        }`}
      >
        Rejected <span className="text-xs">({rejectedCount})</span>
      </button>
    </div>
  );
};
