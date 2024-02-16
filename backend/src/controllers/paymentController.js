import { nanoid } from "nanoid";

import { User } from "../models/userModel.js";
import { asyncHandlerWrapper } from "../utils/asyncHandlerWrapper.js";
import { verifyToken } from "../utils/verifyToken.js";

export const addMoney = asyncHandlerWrapper(async (req, res) => {
  const { amount } = req?.body;
  const { authorization } = req?.headers;
  const token = authorization?.split(" ")[1];

  if (!token) {
    res.status(400);
    throw new Error("Not Authorized, No Token");
  }
  const _id = verifyToken(token);
  if (!_id) {
    res.status(400);
    throw new Error("Not Authorized, Invalid Token");
  }

  if (!amount) {
    res.status(400);
    throw new Error("Specify an amount");
  }

  if (amount < 1) {
    res.status(400);
    throw new Error("Amount should be atleast 1");
  }

  const amountInPaise = amount * 100;

  const user = await User.findById(_id);
  user.accountBalance = user.accountBalance + amountInPaise;

  const updatedUser = await user.save();

  res.status(200).json({
    message: "Money Added",
    user: {
      fullname: updatedUser?.fullname,
      email: updatedUser?.email,
      username: updatedUser?.username,
      accountBalance: updatedUser?.accountBalance,
      transactions: updatedUser?.transactions?.length,
      sentRequests: updatedUser?.sentRequests?.length,
      receivedRequests: updatedUser?.receivedRequests?.length,
    },
  });
});

export const payMoney = asyncHandlerWrapper(async (req, res) => {
  const { authorization } = req?.headers;
  const token = authorization?.split(" ")[1];
  if (!token) {
    res.status(400);
    throw new Error("Not Authorized, No Token");
  }
  const _id = verifyToken(token);
  if (!_id) {
    res.status(400);
    throw new Error("Not Authorized, Invalid Token");
  }

  const { payToUsername, amount } = req?.body;
  if (!(payToUsername && amount)) {
    res.status(400);
    throw new Error("Enter all fields");
  }
  if (amount <= 0) {
    res.status(400);
    throw new Error("Cannot pay negative amount");
  }

  const amountInPaise = amount * 100;
  const user = await User.findById(_id);

  if (user?.username === payToUsername) {
    res.status(400);
    throw new Error("Cannot send to self");
  }

  if (user?.accountBalance < amountInPaise) {
    res.status(400);
    throw new Error("Not enough Balance");
  }

  const payToUser = await User.findOneAndUpdate(
    { username: payToUsername },
    {
      $push: {
        transactions: {
          fullname: user.fullname,
          username: user.username,
          amount: amountInPaise,
          tag: "RECEIVED",
          date: new Date(Date.now()),
        },
      },
      $inc: { accountBalance: amountInPaise },
    }
  );
  if (!payToUser) {
    res.status(400);
    throw new Error("No such user found");
  }

  const updatedUser = await User.findOneAndUpdate(
    { username: user?.username },
    {
      $push: {
        transactions: {
          fullname: payToUser.fullname,
          username: payToUser.username,
          amount: amountInPaise,
          tag: "PAID",
          date: new Date(Date.now()),
        },
      },
      $inc: { accountBalance: -amountInPaise },
    },
    { new: true }
  );

  res.status(200).json({
    message: "Payment Successful",
    user: {
      fullname: updatedUser?.fullname,
      email: updatedUser?.email,
      username: updatedUser?.username,
      accountBalance: updatedUser?.accountBalance,
      transactions: updatedUser?.transactions?.length,
      sentRequests: updatedUser?.sentRequests?.length,
      receivedRequests: updatedUser?.receivedRequests?.length,
    },
  });
});

export const requestMoney = asyncHandlerWrapper(async (req, res) => {
  const { authorization } = req?.headers;
  const token = authorization?.split(" ")[1];
  if (!token) {
    res.status(400);
    throw new Error("Not Authorized, No Token");
  }
  const _id = verifyToken(token);
  if (!_id) {
    res.status(400);
    throw new Error("Not Authorized, Invalid Token");
  }

  const { requestFromUsername, amount } = req?.body;
  if (!(requestFromUsername && amount)) {
    res.status(400);
    throw new Error("Enter all fields");
  }
  if (amount < 1) {
    res.status(400);
    throw new Error("Request should be atleast ₹1");
  }

  const amountInPaise = amount * 100;
  const user = await User.findById(_id);

  if (user?.username === requestFromUsername) {
    res.status(400);
    throw new Error("Cannot request from self");
  }

  const paymentId = nanoid();

  const fromUser = await User.findOneAndUpdate(
    {
      username: requestFromUsername,
    },
    {
      $push: {
        receivedRequests: {
          _id: paymentId,
          username: user.username,
          fullname: user.fullname,
          amount: amountInPaise,
          status: "PENDING",
        },
      },
    }
  );
  if (!fromUser) {
    res.status(400);
    throw new Error("No such user found");
  }

  const updatedUser = await User.findOneAndUpdate(
    { username: user?.username },
    {
      $push: {
        sentRequests: {
          _id: paymentId,
          fullname: fromUser.fullname,
          username: fromUser.username,
          amount: amountInPaise,
          status: "PENDING",
        },
      },
    },
    { new: true }
  );

  res.status(200).json({
    message: "Request Sent",
    user: {
      fullname: updatedUser?.fullname,
      email: updatedUser?.email,
      username: updatedUser?.username,
      accountBalance: updatedUser?.accountBalance,
      transactions: updatedUser?.transactions?.length,
      sentRequests: updatedUser?.sentRequests?.length,
      receivedRequests: updatedUser?.receivedRequests?.length,
    },
  });
});

export const acceptPayment = asyncHandlerWrapper(async (req, res) => {
  const { authorization } = req?.headers;
  const token = authorization?.split(" ")[1];
  if (!token) {
    res.status(400);
    throw new Error("Not Authorized, No Token");
  }
  const _id = verifyToken(token);
  if (!_id) {
    res.status(400);
    throw new Error("Not Authorized, Invalid Token");
  }

  const { paymentData } = req?.body;
  if (!paymentData) {
    res.status(400);
    throw new Error("Missing paymentData");
  }

  const user = await User.findById(_id);
  const payToUser = await User.findOne({ username: paymentData?.username });

  if (user?.accountBalance < paymentData?.amount) {
    res.status(400);
    throw new Error("Not enough Balance");
  }

  await User.updateOne(
    {
      username: paymentData?.username,
      "sentRequests._id": paymentData?._id,
    },
    {
      $set: { "sentRequests.$.status": "PAID" },
      $push: {
        transactions: {
          fullname: user.fullname,
          username: user.username,
          amount: paymentData?.amount,
          tag: "RECEIVED",
          date: new Date(Date.now()),
        },
      },
      $inc: { accountBalance: paymentData?.amount },
    }
  );

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      $push: {
        transactions: {
          fullname: payToUser.fullname,
          username: payToUser.username,
          amount: paymentData?.amount,
          tag: "PAID",
          date: new Date(Date.now()),
        },
      },
      $pull: { receivedRequests: { _id: paymentData?._id } },
      $inc: { accountBalance: -paymentData?.amount },
    },
    { new: true }
  );

  res.status(200).json({
    message: "Paid",
    user: {
      fullname: updatedUser?.fullname,
      email: updatedUser?.email,
      username: updatedUser?.username,
      accountBalance: updatedUser?.accountBalance,
      transactions: updatedUser?.transactions?.length,
      sentRequests: updatedUser?.sentRequests?.length,
      receivedRequests: updatedUser?.receivedRequests?.length,
    },
  });
});

export const rejectPayment = asyncHandlerWrapper(async (req, res) => {
  const { authorization } = req?.headers;
  const token = authorization?.split(" ")[1];
  if (!token) {
    res.status(400);
    throw new Error("Not Authorized, No Token");
  }
  const _id = verifyToken(token);
  if (!_id) {
    res.status(400);
    throw new Error("Not Authorized, Invalid Token");
  }

  const { paymentData } = req?.body;
  if (!paymentData) {
    res.status(400);
    throw new Error("Missing paymentData");
  }

  await User.updateOne(
    {
      username: paymentData?.username,
      "sentRequests._id": paymentData?._id,
    },
    { $set: { "sentRequests.$.status": "REJECTED" } }
  );

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      $pull: { receivedRequests: { _id: paymentData?._id } },
    },
    { new: true }
  );

  res.status(200).json({
    message: "Payment Rejected",
    user: {
      fullname: updatedUser?.fullname,
      email: updatedUser?.email,
      username: updatedUser?.username,
      accountBalance: updatedUser?.accountBalance,
      transactions: updatedUser?.transactions?.length,
      sentRequests: updatedUser?.sentRequests?.length,
      receivedRequests: updatedUser?.receivedRequests?.length,
    },
  });
});
