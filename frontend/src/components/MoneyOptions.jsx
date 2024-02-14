import React from "react";

export const MoneyOptions = ({ setAmount }) => {
  return (
    <div className="flex gap-1 justify-between max-[450px]:grid max-[450px]:grid-cols-2">
      <button
        onClick={() => setAmount((prevAmount) => Number(prevAmount) + 10)}
        className="bg-white select-none rounded px-5 py-[2px] font-semibold hover:cursor-pointer border border-black hover:bg-neutral-700 hover:text-white transition-all"
      >
        ₹10 +
      </button>
      <button
        onClick={() => setAmount((prevAmount) => Number(prevAmount) + 100)}
        className="bg-white select-none rounded px-5 py-[2px] font-semibold hover:cursor-pointer border border-black hover:bg-neutral-700 hover:text-white transition-all"
      >
        ₹100 +
      </button>
      <button
        onClick={() => setAmount((prevAmount) => Number(prevAmount) + 500)}
        className="bg-white select-none rounded px-5 py-[2px] font-semibold hover:cursor-pointer border border-black hover:bg-neutral-700 hover:text-white transition-all"
      >
        ₹500 +
      </button>
      <button
        onClick={() => setAmount((prevAmount) => Number(prevAmount) + 1000)}
        className="bg-white select-none rounded px-5 py-[2px] font-semibold hover:cursor-pointer border border-black hover:bg-neutral-700 hover:text-white transition-all"
      >
        ₹1,000 +
      </button>
    </div>
  );
};
