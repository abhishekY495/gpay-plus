import React, { useState } from "react";

import { Light } from "../Light";

export const DisclaimerModal = ({ serverLive }) => {
  const [hide, setHide] = useState(false);

  const closeModal = () => {
    if (serverLive) setHide(true);
  };

  return (
    <div
      className={`${
        hide ? "hidden" : ""
      } fixed top-0 left-0 w-screen h-screen px-2 bg-neutral-700/50 backdrop-blur-[2px] z-10 transition-all`}
    >
      <div
        className="w-[450px] m-auto bg-neutral-200 flex flex-col gap-2 py-4 pb-4 px-6 mt-[70px] rounded max-[450px]:w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-neutral-300 px-1">
          <div className="flex gap-3">
            <Light serverLive={serverLive} />
            <p className="font-bold text-2xl">Disclaimer</p>
          </div>
          <button
            className="bg-neutral-300 rounded-full p-[2px] px-[8px] -mt-2 hover:cursor-pointer hover:bg-neutral-400/50 transition-all"
            onClick={closeModal}
          >
            ⨉
          </button>
        </div>
        <p>
          Server is hosted on
          <a
            href="https://render.com"
            target="_blank"
            className="font-semibold text-blue-600 hover:underline transition-all"
          >
            {" "}
            Render
          </a>
          , so it may take some time to start.
          <br />
          Please wait till the above <b>light</b> turns <b>green</b> and then
          you can close this message.
        </p>
      </div>
    </div>
  );
};
