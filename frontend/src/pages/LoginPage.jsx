import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import showPasswordIcon from "../assets/password/showPasswordIcon.svg";
import hidePasswordIcon from "../assets/password/hidePasswordIcon.svg";
import { guestCredentials } from "../utils/constants";
import { loginUser } from "../features/userSlice";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { userData, authLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const loginHandler = async (e) => {
    e.preventDefault();
    if (username.trim().length === 0) {
      toast.error("Username cannot be empty");
      return;
    }
    if (password.trim().length === 0) {
      toast.error("Password cannot be empty");
      return;
    }
    //
    const userData = {
      username,
      password,
    };
    dispatch(loginUser(userData));
  };

  const guestCredentialsBtnHandler = () => {
    setUsername(guestCredentials.username);
    setPassword(guestCredentials.password);
  };

  useEffect(() => {
    if (userData) {
      navigate(
        location?.state?.prevUrl ? location?.state?.prevUrl : "/dashboard"
      );
    }
  });

  return (
    <div className="w-[400px] m-auto px-2 max-[400px]:w-full">
      <h2 className="text-3xl text-center font-bold my-5">Login</h2>
      <form
        onSubmit={loginHandler}
        className="flex flex-col gap-4 bg-neutral-100 p-8 rounded-md"
      >
        <label className="flex flex-col">
          <p className="font-semibold">
            Username <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            required
            className="border-neutral-200 border-2 pl-2 py-1 rounded-md focus:outline-none focus:border-neutral-400"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
          />
        </label>
        <label className="flex flex-col">
          <p className="font-semibold">
            Password <span className="text-red-500">*</span>
          </p>
          <div className="relative flex flex-col">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="border-neutral-200 border-2 pl-2 py-1 pr-9 rounded-md focus:outline-none focus:border-neutral-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? hidePasswordIcon : showPasswordIcon}
              alt="eye"
              className="opacity-50 w-5 absolute right-3 top-2 hover:cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </label>
        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className={`bg-orange-400 rounded p-1 font-semibold hover:opacity-90 disabled:cursor-not-allowed`}
            disabled={authLoading}
          >
            Login
          </button>
          <button
            type="button"
            className="bg-neutral-400 rounded p-1 font-semibold hover:opacity-90"
            onClick={guestCredentialsBtnHandler}
          >
            Guest Credentials
          </button>
        </div>
        <p className="font-semibold -mt-3">
          Don't have an Account?{" "}
          <Link to="/register" className="underline text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};
