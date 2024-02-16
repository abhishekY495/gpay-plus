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
  sentRequests,
  receivedRequests,
} from "../controllers/userControllers.js";

export const userRoutes = express.Router();

userRoutes.get("/validate", validateUser);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);
userRoutes.get("/search", searchUser);
userRoutes.get("/transactions", userTransactions);
userRoutes.get("/sent-requests", sentRequests);
userRoutes.get("/received-requests", receivedRequests);
userRoutes.get("/:username", userProfile);
userRoutes.route("/profile").put(updateUserProfile).delete(deleteUserProfile);
