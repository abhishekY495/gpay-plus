import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { requestMoney } from "../../features/userSlice";
import { MoneyOptions } from "../MoneyOptions";

export const RequestModal = ({
  requestOpenModal,
  setRequestOpenModal,
  requestFromUsername,
}) => {
  const { requestMoneyLoading, userToken } = useSelector((state) => state.user);
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const closeModal = () => {
    if (!requestMoneyLoading) {
      setRequestOpenModal(false);
      setAmount("");
    }
  };

  const inputHandler = (e) => {
    const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
    const amount = e.target.value.match(regex)[1];
    setAmount(Number(amount));
  };

  const requestBtnHandler = () => {
    if (amount <= 0) {
      toast.error("Enter valid amount");
      return;
    }
    if (amount < 1) {
      toast.error("Should be atleast ₹1");
      return;
    }
    const requestData = {
      requestFromUsername,
      amount,
    };
    dispatch(requestMoney({ requestData, userToken, closeModal }));
  };

  if (!requestOpenModal) return null;
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-neutral-700/50 backdrop-blur-sm z-10 transition-none"
      onClick={closeModal}
    >
      <div
        className="w-[450px] m-auto bg-neutral-200 flex flex-col gap-2 py-4 pb-4 px-6 mt-[70px] rounded max-[450px]:w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-neutral-300 px-2">
          <p className="font-bold text-4xl mb-1">Request</p>
          <button
            className="bg-neutral-300 rounded-full p-1 px-[10px] mb-2 hover:cursor-pointer hover:bg-neutral-400/50 transition-all"
            onClick={closeModal}
          >
            ⨉
          </button>
        </div>
        <div className="relative flex flex-col gap-4">
          <span className="absolute top-[6px] left-3 border-r pr-2 font-semibold hover:cursor-pointer">
            ₹
          </span>
          <input
            type="number"
            className="border-neutral-300 border-2 pl-9 py-1 rounded-md focus:outline-none focus:border-neutral-400"
            placeholder="Enter amount"
            value={amount}
            onChange={inputHandler}
          />
          <MoneyOptions setAmount={setAmount} />
          <button
            className="bg-red-400 font-semibold rounded-md py-1 border-2 border-red-500 hover:opacity-90 disabled:cursor-not-allowed transition-all"
            onClick={requestBtnHandler}
            disabled={requestMoneyLoading}
          >
            Request
          </button>
        </div>
      </div>
    </div>
  );
};
