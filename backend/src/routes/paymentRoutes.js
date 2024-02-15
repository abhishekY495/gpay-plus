import express from "express";

import { addMoney, payMoney } from "../controllers/paymentController.js";

export const paymentRoutes = express.Router();

paymentRoutes.put("/add-money", addMoney);
paymentRoutes.put("/pay-money", payMoney);
