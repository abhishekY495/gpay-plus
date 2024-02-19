import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { rejectPayment } from "../../features/userSlice";

export const RejectModal = ({
  openRejectModal,
  setOpenRejectModal,
  username,
  _id,
}) => {
  const { userToken, rejectPaymentLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const closeModal = () => {
    if (!rejectPaymentLoading) {
      setOpenRejectModal(false);
    }
  };

  const rejectBtnHandler = () => {
    const paymentData = { username, _id };
    dispatch(rejectPayment({ paymentData, userToken, closeModal }));
  };

  if (!openRejectModal) return null;
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-neutral-700/50 backdrop-blur-sm z-10 transition-none"
      onClick={closeModal}
    >
      <div
        className="w-[450px] m-auto bg-neutral-200 flex flex-col gap-1 py-4 pb-4 px-6 mt-[70px] rounded max-[450px]:w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-neutral-300">
          <p className="font-bold text-4xl mb-1 max-[500px]:text-3xl">
            Are you sure ?
          </p>
          <button
            className="bg-neutral-300 rounded-full p-1 px-[10px] mb-2 hover:cursor-pointer hover:bg-neutral-400/50 transition-all"
            onClick={closeModal}
          >
            ⨉
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <p>
            By doing so, the payment will be rejected, and no money will be
            transferred. This action cannot be reversed.
          </p>
          <button
            className="bg-red-400 py-1 font-semibold rounded-md border-2 border-red-500 hover:opacity-90 disabled:cursor-not-allowed transition-all"
            onClick={rejectBtnHandler}
            disabled={rejectPaymentLoading}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};
