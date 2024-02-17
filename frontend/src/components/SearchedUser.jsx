import React, { useState } from "react";

import { PayModal } from "./Modals/PayModal";
import { RequestModal } from "./Modals/RequestModal";

export const SearchedUser = ({ user }) => {
  const { fullname, username } = user;
  const [payOpenModal, setPayOpenModal] = useState(false);
  const [requestOpenModal, setRequestOpenModal] = useState(false);

  return (
    <>
      <PayModal
        payOpenModal={payOpenModal}
        setPayOpenModal={setPayOpenModal}
        payToUsername={username}
      />
      <RequestModal
        requestOpenModal={requestOpenModal}
        setRequestOpenModal={setRequestOpenModal}
        requestFromUsername={username}
      />
      <div className="flex justify-between items-center border-b gap-2">
        <div>
          <p className="font-bold text-xl leading-5">{fullname}</p>
          <p className="text-neutral-500 text-sm mb-2">@{username}</p>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-green-400 px-3 p-1 rounded font-semibold hover:opacity-90"
            onClick={() => setPayOpenModal(true)}
          >
            Pay
          </button>
          <button
            className="bg-red-400 px-3 p-1 rounded font-semibold hover:opacity-90"
            onClick={() => setRequestOpenModal(true)}
          >
            Request
          </button>
        </div>
      </div>
    </>
  );
};
