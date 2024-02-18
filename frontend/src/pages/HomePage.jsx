import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import image1 from "../assets/image-1.jpg";
import qrCode from "../assets/qr-code.png";

export const HomePage = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="w-[800px] m-auto max-[800px]:w-full flex flex-col gap-2 p-3">
      <div className="flex rounded-xl gap-8 items-center p-8 bg-neutral-200 max-[635px]:flex-col max-[635px]:gap-3 max-[520px]:p-4">
        <img
          src={image1}
          alt="banner"
          className="rounded-3xl w-[50%] max-[635px]:w-full"
        />
        <div className="flex flex-col gap-1 max-[635px]:px-3">
          <h2 className="font-bold text-4xl max-[635px]:text-3xl">
            Pay or Request Money
          </h2>
          <h2 className="font-bold text-2xl max-[635px]:text-xl">
            anytime, anywhere
          </h2>
        </div>
      </div>
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
      <div className="bg-neutral-100/60 rounded-xl flex items-center p-8 max-[520px]:p-4">
        <img
          src={qrCode}
          className="rounded-xl w-32 bg-white p-2 max-[520px]:w-32 max-[430px]:w-[118px]"
          alt="qr code"
        />
        <h2 className="font-bold text-2xl p-4 max-[635px]:text-xl max-[520px]:p-2 max-[420px]:text-lg">
          A personal QR Code for your profile to accept payments.
        </h2>
      </div>
    </div>
  );
};
