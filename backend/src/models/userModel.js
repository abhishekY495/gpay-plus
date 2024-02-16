import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const transactionSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, lowercase: true },
    fullname: { type: String, required: true },
    amount: { type: Number, required: true },
    tag: { type: String, enum: ["PAID", "RECEIVED"], required: true },
  },
  { timestamps: true }
);

const paymentSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true, lowercase: true },
    fullname: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "REJECTED"],
      default: "PENDING",
      required: true,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    accountBalance: { type: Number, required: true },
    transactions: { type: [transactionSchema] },
    sentRequests: { type: [paymentSchema] },
    receivedRequests: { type: [paymentSchema] },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
