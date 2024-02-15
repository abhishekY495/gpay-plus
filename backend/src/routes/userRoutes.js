import express from "express";
import {
  validateUser,
  loginUser,
  logoutUser,
  registerUser,
  userProfile,
  updateUserProfile,
  deleteUserProfile,
  searchUser,
  userTransactions,
  requestedPayments,
  receivedPaymentRequests,
} from "../controllers/userControllers.js";

export const userRoutes = express.Router();

userRoutes.get("/validate", validateUser);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);
userRoutes.get("/search", searchUser);
userRoutes.get("/transactions", userTransactions);
userRoutes.get("/requested-payments", requestedPayments);
userRoutes.get("/received-payment-requests", receivedPaymentRequests);
userRoutes.get("/:username", userProfile);
userRoutes.route("/profile").put(updateUserProfile).delete(deleteUserProfile);
