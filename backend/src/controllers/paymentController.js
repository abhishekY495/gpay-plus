import { User } from "../models/userModel.js";

import { asyncHandlerWrapper } from "../utils/asyncHandlerWrapper.js";
import { verifyToken } from "../utils/verifyToken.js";

export const payUser = asyncHandlerWrapper(async (req, res) => {
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

  const user = await User.findById(_id);

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
          tag: "RECIEVED",
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
      transactions: updatedUser?.transactions,
      requestedPayments: updatedUser?.requestedPayments,
      recievedPaymentRequests: updatedUser?.recievedPaymentRequests,
    },
  });
});

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
      transactions: updatedUser?.transactions,
      requestedPayments: updatedUser?.requestedPayments,
      recievedPaymentRequests: updatedUser?.recievedPaymentRequests,
    },
  });
});
