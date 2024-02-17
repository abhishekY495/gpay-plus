import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import showPasswordIcon from "../assets/password/showPasswordIcon.svg";
import hidePasswordIcon from "../assets/password/hidePasswordIcon.svg";
import { validEmailFormat } from "../utils/validEmailFormat";
import { registerUser } from "../features/userSlice";

export const RegisterPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { userData, authLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerHandler = async (e) => {
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
    if (username.trim().length === 0) {
      toast.error("Username cannot be empty");
      return;
    }
    if (!(username.length >= 3)) {
      toast.error("Username should be atleast 3 Characters");
      return;
    }
    if (password.trim().length === 0) {
      toast.error("Password cannot be empty");
      return;
    }
    if (!(password.length >= 10)) {
      toast.error("Password should be atleast 10 Characters");
      return;
    }
    //
    const userData = {
      fullname,
      email,
      username,
      password,
    };
    dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (userData) {
      navigate("/dashboard");
    }
  });

  return (
    <div className="w-[400px] m-auto px-2 max-[400px]:w-full">
      <h2 className="text-3xl text-center font-bold my-5">Register</h2>
      <form
        onSubmit={registerHandler}
        className="flex flex-col gap-4 bg-neutral-100 p-8 rounded-md"
      >
        <label className="flex flex-col">
          <p className="font-semibold">
            Full Name <span className="text-red-500">*</span>
          </p>
          <input
            required
            type="text"
            className="border-neutral-200 border-2 pl-2 py-1 rounded-md focus:outline-none focus:border-neutral-400"
            onChange={(e) => setFullname(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          <p className="font-semibold">
            Email <span className="text-red-500">*</span>
          </p>
          <input
            required
            type="email"
            className="border-neutral-200 border-2 pl-2 py-1 rounded-md focus:outline-none focus:border-neutral-400"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            value={email}
          />
        </label>
        <label className="flex flex-col">
          <p className="font-semibold">
            Username{" "}
            <span className="text-red-500">
              * <span className="text-xs">Username cannot be changed</span>
            </span>
          </p>
          <input
            required
            type="text"
            className="border-neutral-200 border-2 pl-2 py-1 rounded-md focus:outline-none focus:border-neutral-400"
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            value={username}
          />
        </label>
        <label className="flex flex-col">
          <p className="font-semibold">
            Password <span className="text-red-500">*</span>
          </p>
          <div className="flex relative flex-col">
            <input
              required
              type={showPassword ? "text" : "password"}
              className="border-neutral-200 border-2 pl-2 py-1 pr-9 rounded-md focus:outline-none focus:border-neutral-400"
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
        <button
          type="submit"
          className={`bg-orange-400 rounded p-1 font-semibold hover:opacity-90 disabled:cursor-not-allowed`}
          disabled={authLoading}
        >
          Register
        </button>
        <p className="font-semibold -mt-3">
          Have an Account?{" "}
          <Link to="/login" className="underline text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
