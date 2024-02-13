import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    amount: { type: Number, required: true },
    tag: { type: String, enum: ["PAID", "RECIEVED"], required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
