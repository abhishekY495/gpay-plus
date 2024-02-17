import React from "react";

export const Shimmer = () => {
  return (
    <div className="w-[340px] h-[445px] m-auto mt-4 p-4 rounded-md animate-shimmer-ui flex flex-col">
      <div className="h-full bg-neutral-200 border-2 rounded-md flex flex-col items-center gap-1 mb-2"></div>
      <div className="flex flex-col gap-2 mt-2">
        <button className="w-full h-[32px] p-1 rounded animate-shimmer-green"></button>
        <button className="w-full h-[32px] p-1 rounded animate-shimmer-red"></button>
      </div>
    </div>
  );
};
