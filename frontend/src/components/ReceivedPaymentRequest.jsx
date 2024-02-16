import React, { useState } from "react";

import { formatDate } from "../utils/formatDate";
import { RejectModal } from "./Modals/RejectModal";
import { PayRequestedAmountModal } from "./Modals/PayRequestedAmountModal";

export const ReceivedPaymentRequest = ({ receivedPaymentRequest }) => {
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openPayRequestedAmountModal, setOpenPayRequestedAmountModal] =
    useState(false);
  const { username, fullname, amount, createdAt, _id } = receivedPaymentRequest;

  return (
    <>
      <RejectModal
        openRejectModal={openRejectModal}
        setOpenRejectModal={setOpenRejectModal}
        username={username}
        _id={_id}
      />
      <PayRequestedAmountModal
        openPayRequestedAmountModal={openPayRequestedAmountModal}
        setOpenPayRequestedAmountModal={setOpenPayRequestedAmountModal}
        amount={amount}
        fullname={fullname}
      />
      <div className="bg-neutral-100 p-3 px-5 rounded-md hover:cursor-pointer hover:bg-neutral-200/60 transition-all">
        <p className="text-xl font-bold max-[430px]:text-lg">{fullname}</p>
        <p className="text-sm -mt-1">@{username}</p>
        <p className="text-sm">{formatDate(createdAt)}</p>
        <p className="text-2xl font-semibold my-1">
          {(amount / 100).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </p>
        <div className="flex gap-2">
          <button
            className="w-full bg-green-500 px-5 py-1 rounded font-semibold hover:cursor-pointer hover:bg-green-500/90 text-white"
            onClick={() => setOpenPayRequestedAmountModal(true)}
          >
            Pay
          </button>
          <button
            className="w-full bg-red-500 px-5 py-1 rounded font-semibold hover:cursor-pointer hover:bg-red-500/90 text-white"
            onClick={() => setOpenRejectModal(true)}
          >
            Reject
          </button>
        </div>
      </div>
    </>
  );
};
