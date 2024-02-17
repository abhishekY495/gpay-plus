import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AddMoneyModal } from "./Modals/AddMoneyModal";

export const Operations = () => {
  const {
    userData: { receivedRequests, sentRequests, transactions },
  } = useSelector((state) => state.user);
  const [openAddMoneyModal, setOpenAddMoneyModal] = useState(false);

  return (
    <>
      <AddMoneyModal
        openAddMoneyModal={openAddMoneyModal}
        setOpenAddMoneyModal={setOpenAddMoneyModal}
      />
      <div className="grid grid-cols-2 gap-3 mt-5">
        <Link
          to="/pay-or-request"
          className="text-center bg-blue-400 py-[5px] px-3 rounded border-2 border-blue-500 font-semibold hover:opacity-85 transition-all"
        >
          Pay / Request
        </Link>
        <Link
          to="/sent-requests"
          className="text-center bg-red-400 py-[5px] px-3 rounded border-2 border-red-500 font-semibold hover:opacity-85 transition-all"
        >
          Sent Requests ({sentRequests})
        </Link>
        <Link
          to="/received-requests"
          className="text-center bg-yellow-400 py-[5px] px-3 rounded border-2 border-yellow-500 font-semibold hover:opacity-85 transition-all"
        >
          Received Requests ({receivedRequests})
        </Link>
        <button
          className="text-center bg-green-400 py-[5px] px-3 rounded border-2 border-green-500 font-semibold hover:opacity-85 transition-all"
          onClick={() => setOpenAddMoneyModal(true)}
        >
          Add Money
        </button>
        <Link
          to="/transactions"
          className="col-span-2 text-center bg-neutral-300 py-[5px] px-3 rounded border-2 border-neutral-400 font-semibold hover:opacity-85 transition-all"
        >
          Transactions ({transactions})
        </Link>
      </div>
    </>
  );
};
