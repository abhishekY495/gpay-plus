import React from "react";
import { Link } from "react-router-dom";

export const AboutMe = () => {
  return (
    <div className="w-full bg-neutral-100/50 rounded-xl text-neutral-400 text-center flex flex-col py-3">
      <p>
        Made by{" "}
        <Link
          to="https://abhisheky495.netlify.app"
          className="underline underline-offset-4 hover:text-neutral-500 transition-all"
          target="_blank"
        >
          Abhishek
        </Link>{" "}
        •{" "}
        <Link
          to="https://github.com/abhishekY495/gpay-plus"
          className="underline underline-offset-4 hover:text-neutral-500 transition-all"
          target="_blank"
        >
          Code
        </Link>
      </p>
    </div>
  );
};
