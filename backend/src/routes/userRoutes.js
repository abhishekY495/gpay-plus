import express from "express";
import {
  validateUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/userControllers.js";

export const userRoutes = express.Router();

userRoutes.get("/validate", validateUser);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);
userRoutes.route("/profile").put(updateUserProfile).delete(deleteUserProfile);
