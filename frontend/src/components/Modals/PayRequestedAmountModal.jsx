import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { acceptPayment } from "../../features/userSlice";

export const PayRequestedAmountModal = ({
  openPayRequestedAmountModal,
  setOpenPayRequestedAmountModal,
  amount,
  fullname,
  username,
  _id,
}) => {
  const { userToken, acceptPaymentLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const closeModal = () => {
    if (!acceptPaymentLoading) {
      setOpenPayRequestedAmountModal(false);
    }
  };

  const payBtnHandler = () => {
    const paymentData = { fullname, username, _id, amount };
    dispatch(acceptPayment({ paymentData, userToken, closeModal }));
  };

  if (!openPayRequestedAmountModal) return null;
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
            Confirm
          </p>
          <button
            className="bg-neutral-300 rounded-full p-1 px-[10px] mb-2 hover:cursor-pointer hover:bg-neutral-400/50 transition-all"
            onClick={closeModal}
          >
            ⨉
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <p>
              By doing so, the payment will be initiated, and{" "}
              <span className="font-semibold">
                ₹{(amount / 100).toFixed(2)}
              </span>{" "}
              will be transferred to{" "}
              <span className="font-semibold">{fullname}</span>.
            </p>
          </div>
          <button
            className="bg-green-400 py-1 font-semibold rounded-md border-2 border-green-500 hover:opacity-80 disabled:cursor-not-allowed transition-all"
            onClick={payBtnHandler}
            disabled={acceptPaymentLoading}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};
