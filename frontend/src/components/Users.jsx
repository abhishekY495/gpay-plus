import React, { useState } from "react";
import { PayModal } from "./Modals/PayModal";

export const Users = ({ users }) => {
  const [payOpenModal, setPayOpenModal] = useState(false);

  return (
    <div className="flex flex-col gap-2 px-2 mt-2">
      {users.map(({ fullname, username }) => {
        return (
          <div
            key={username}
            className="flex justify-between items-center border-b gap-2"
          >
            <PayModal
              payOpenModal={payOpenModal}
              setPayOpenModal={setPayOpenModal}
              payToUsername={username}
            />
            <div>
              <p className="font-bold text-xl leading-5">{fullname}</p>
              <p className="text-neutral-500 text-sm mb-2">@{username}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-green-400 px-3 p-1 rounded-md font-semibold hover:opacity-90"
                onClick={() => setPayOpenModal(true)}
              >
                Pay
              </button>
              <button className="bg-red-400 px-3 p-1 rounded-md font-semibold hover:opacity-90">
                Request
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
