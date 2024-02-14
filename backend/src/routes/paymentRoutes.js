import express from "express";

import { payUser, addMoney } from "../controllers/paymentController.js";

export const paymentRoutes = express.Router();

paymentRoutes.put("/pay-user", payUser);
paymentRoutes.put("/add-money", addMoney);
