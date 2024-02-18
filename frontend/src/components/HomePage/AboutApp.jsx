import React from "react";

import image1 from "../../assets/image-1.jpg";

export const AboutApp = () => {
  return (
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
  );
};
