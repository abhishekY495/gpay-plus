import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AddMoneyModal } from "./Modals/AddMoneyModal";

export const Operations = () => {
  const {
    userData: { receivedPaymentRequests, requestedPayments, transactions },
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
          className="text-center bg-blue-400 py-2 px-3 rounded font-semibold hover:bg-blue-500/90 transition-all"
        >
          Pay / Request
        </Link>
        <Link
          to="/requested-payments"
          className="text-center bg-red-400 py-2 px-3 rounded font-semibold hover:bg-red-500/90 transition-all"
        >
          Requested Payments ({requestedPayments})
        </Link>
        <Link
          to="/received-payment-requests"
          className="text-center bg-yellow-400 py-2 px-3 rounded font-semibold hover:bg-yellow-500/90 transition-all"
        >
          Received Payment Requests ({receivedPaymentRequests})
        </Link>
        <button
          className="text-center bg-green-400 py-2 px-3 rounded font-semibold hover:bg-green-500/90 transition-all"
          onClick={() => setOpenAddMoneyModal(true)}
        >
          Add Money
        </button>
        <Link
          to="/transactions"
          className="col-span-2 text-center bg-neutral-300 py-2 px-3 rounded font-semibold hover:bg-neutral-400/90 transition-all"
        >
          Transactions ({transactions})
        </Link>
      </div>
    </>
  );
};
