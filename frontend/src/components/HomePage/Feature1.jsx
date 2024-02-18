import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Feature1 = () => {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-1 items-center rounded-xl p-8 bg-neutral-100 max-[520px]:p-4">
      <h2 className="font-bold text-2xl p-4 max-[635px]:text-xl max-[520px]:p-2">
        {userData ? "Go to Dashboard" : "Register or Login"}, add Money 💵 to
        your account and start sending to your friends and family.
      </h2>
      <div className="w-full px-2 justify-center flex gap-4 max-[635px]:mb-2">
        {userData ? (
          <Link
            to="/dashboard"
            className="w-[150px] text-center bg-black text-white border-2 border-neutral-400 rounded-md p-[5px] px-8 font-semibold hover:bg-black/80 transition-all max-[335px]:px-5"
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/register"
              className="w-[150px] text-center bg-black text-white border-2 border-neutral-400 rounded-md p-[5px] px-8 font-semibold hover:bg-black/80 transition-all max-[335px]:px-5"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="w-[150px] text-center bg-black text-white border-2 border-neutral-400 rounded-md p-[5px] px-8 font-semibold hover:bg-black/80 transition-all max-[335px]:px-5"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
