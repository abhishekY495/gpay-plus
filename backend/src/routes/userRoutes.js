import express from "express";
import {
  validateUser,
  loginUser,
  logoutUser,
  registerUser,
  userProfile,
} from "../controllers/userControllers.js";

export const userRoutes = express.Router();

userRoutes.get("/validate", validateUser);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);
userRoutes.get("/profile", userProfile);
