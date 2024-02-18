import React from "react";

import qrCode from "../../assets/qr-code.png";

export const Feature2 = () => {
  return (
    <div className="bg-neutral-100/70 rounded-xl flex items-center p-8 max-[520px]:p-4">
      <img
        src={qrCode}
        className="rounded-xl w-32 bg-white p-2 max-[520px]:w-32 max-[430px]:w-[118px]"
        alt="qr code"
      />
      <h2 className="font-bold text-2xl p-4 max-[635px]:text-xl max-[520px]:p-2 max-[420px]:text-lg">
        A personal QR Code for your profile to accept payments.
      </h2>
    </div>
  );
};
