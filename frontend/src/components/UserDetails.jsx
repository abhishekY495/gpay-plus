import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import showPasswordIcon from "../assets/password/showPasswordIcon.svg";
import hidePasswordIcon from "../assets/password/hidePasswordIcon.svg";
import { validEmailFormat } from "../utils/validEmailFormat";
import { updateUser } from "../features/userSlice";

export const UserDetails = () => {
  const { userData, userToken } = useSelector((state) => state.user);
  const [fullname, setFullname] = useState(userData?.fullname);
  const [email, setEmail] = useState(userData?.email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [disableUpdateBtn, setDisableUpdateBtn] = useState(true);
  const dispatch = useDispatch();

  const fullnameChangeHandler = (e) => {
    const fname = e.target.value;
    setFullname(fname);
    if (fname !== userData?.fullname) {
      setDisableUpdateBtn(false);
    } else {
      setDisableUpdateBtn(true);
    }
  };

  const emailChangeHandler = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (email !== userData?.email) {
      setDisableUpdateBtn(false);
    } else {
      setDisableUpdateBtn(true);
    }
  };

  const passwordChangeHandler = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (password.length !== 0) {
      setDisableUpdateBtn(false);
    } else {
      setDisableUpdateBtn(true);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (fullname.trim().length === 0) {
      toast.error("Full Name cannot be empty");
      return;
    }
    if (email.trim().length === 0) {
      toast.error("Email cannot be empty");
      return;
    }
    if (!validEmailFormat(email)) {
      toast.error("Invalid Email format");
      return;
    }
    if (password && !(password.length >= 10)) {
      toast.error("Password should be atleast 10 Characters");
      return;
    }
    const data = {
      userData: {
        fullname,
        email,
        password,
      },
      token: userToken,
    };
    dispatch(updateUser(data));
    setPassword("");
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className="flex flex-col gap-4 bg-neutral-100 px-8 py-6 rounded-md"
    >
      <label className="flex flex-col">
        <p className="font-semibold">
          Full Name <span className="text-red-500">*</span>
        </p>
        <input
          required
          type="text"
          value={fullname}
          onChange={fullnameChangeHandler}
          className="border-neutral-200 border-2 pl-2 py-1 rounded-md focus:outline-none focus:border-neutral-400"
        />
      </label>
      <label className="flex flex-col">
        <p className="font-semibold">
          Email <span className="text-red-500">*</span>
        </p>
        <input
          required
          type="email"
          value={email}
          onChange={emailChangeHandler}
          className="border-neutral-200 border-2 pl-2 py-1 rounded-md focus:outline-none focus:border-neutral-400"
        />
      </label>
      <div className="relative flex flex-col">
        <label className="flex flex-col">
          <p className="font-semibold">Password</p>
          <input
            type={showPassword ? "text" : "password"}
            onChange={passwordChangeHandler}
            className="border-neutral-200 border-2 pl-2 py-1 rounded-md focus:outline-none focus:border-neutral-400"
            placeholder="Fill to update password"
            value={password}
          />
        </label>
        <img
          src={showPassword ? hidePasswordIcon : showPasswordIcon}
          alt="eye"
          className="opacity-50 w-5 absolute right-3 top-8 hover:cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      <button
        type="submit"
        className={`bg-blue-400 font-semibold py-1 rounded-md ${
          disableUpdateBtn
            ? "opacity-70 hover:cursor-not-allowed"
            : "hover:cursor-pointer hover:opacity-90"
        }`}
        disabled={disableUpdateBtn}
      >
        Update Details
      </button>
    </form>
  );
};
