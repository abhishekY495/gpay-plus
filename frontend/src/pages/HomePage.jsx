import React from "react";

import { AboutApp } from "../components/HomePage/AboutApp";
import { Feature1 } from "../components/HomePage/Feature1";
import { Feature2 } from "../components/HomePage/Feature2";
import { AboutMe } from "../components/HomePage/AboutMe";

export const HomePage = () => {
  return (
    <div className="w-[800px] m-auto max-[800px]:w-full flex flex-col gap-2 p-3">
      <AboutApp />
      <Feature1 />
      <Feature2 />
      <AboutMe />
    </div>
  );
};
