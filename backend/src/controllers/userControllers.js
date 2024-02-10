import { User } from "../models/userModel.js";
import { validEmailFormat } from "../utils/validEmailFormat.js";
import { generateToken } from "../utils/generateToken.js";
import { verifyToken } from "../utils/verifyToken.js";
import { asyncHandlerWrapper } from "../utils/asyncHandlerWrapper.js";

export const registerUser = asyncHandlerWrapper(async (req, res, next) => {
  const { fullname, email, username, password } = req.body;
  if (!(fullname && email && username && password)) {
    res.status(400);
    throw new Error("Enter all fields");
  }

  if (!validEmailFormat(email)) {
    res.status(400);
    throw new Error("Invalid Email format");
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(400);
    throw new Error("Username already exists");
  }

  if (!(password.length >= 10)) {
    res.status(400);
    throw new Error("Password should be atleast 10 characters");
  }

  const user = await User.create({
    fullname,
    email,
    username,
    password,
    accountBalance: 0,
  });
  if (!user) {
    res.status(400);
    throw new Error("Something went wrong");
  }

  const token = generateToken(user?._id);
  res.status(201).json({
    token,
    message: "Registration Successful",
    user: {
      fullname: user?.fullname,
      email: user?.email,
      username: user?.username,
      accountBalance: user?.accountBalance,
    },
  });
});

export const loginUser = asyncHandlerWrapper(async (req, res, next) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    res.status(400);
    throw new Error("Enter all fields");
  }

  const user = await User.findOne({ username });
  if (!user) {
    res.status(400);
    throw new Error("No such Username found");
  }

  const passwordCheck = await user.isPasswordCorrect(password);
  if (!passwordCheck) {
    res.status(400);
    throw new Error("Wrong Password");
  }

  const token = generateToken(user?._id);
  res.status(200).json({
    token,
    message: "Logged In",
    user: {
      fullname: user?.fullname,
      email: user?.email,
      username: user?.username,
      accountBalance: user?.accountBalance,
    },
  });
});

export const validateUser = asyncHandlerWrapper(async (req, res) => {
  const { authorization } = await req?.headers;
  const token = authorization?.split(" ")[1];

  if (!token) {
    res.status(400);
    throw new Error("Not Authorized, No Token");
  }

  const _id = verifyToken(token);
  if (!_id) {
    res.status(400);
    throw new Error("Invalid Token");
  }

  const user = await User.findById(_id);
  if (!user) {
    res.status(400);
    throw new Error("Not Authorized");
  }

  res.status(200).json({
    fullname: user?.fullname,
    email: user?.email,
    username: user?.username,
    accountBalance: user?.accountBalance,
  });
});

export const logoutUser = asyncHandlerWrapper(async (req, res, next) => {
  const { authorization } = await req?.headers;
  const token = authorization?.split(" ")[1];

  if (!token) {
    res.status(400);
    throw new Error("Not Authorized, No Token");
  }

  const _id = verifyToken(token);
  if (!_id) {
    res.status(400);
    throw new Error("Not Authorized");
  }

  res.status(200).json({ message: "Logged Out" });
});

export const userProfile = (req, res) => {};
