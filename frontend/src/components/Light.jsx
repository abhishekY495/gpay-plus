import React from "react";

export const Light = ({ serverLive }) => {
  const loading =
    "bg-red-500 border-red-600 shadow-red-500 shadow-[0px_0px_50px_20px] animate-pulse-fast";
  const live =
    "bg-green-500 border-green-600 shadow-green-500 shadow-[0px_5px_50px_20px]";

  const lightStyle = () => {
    if (serverLive) {
      return live;
    } else {
      return loading;
    }
  };

  return (
    <div
      className={` ${lightStyle()} -mt-[3px] h-7 w-6 rounded-t-full hover:cursor-pointer transition-all`}
    ></div>
  );
};
