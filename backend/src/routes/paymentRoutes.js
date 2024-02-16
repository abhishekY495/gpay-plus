import express from "express";

import {
  addMoney,
  payMoney,
  rejectPayment,
  requestMoney,
} from "../controllers/paymentController.js";

export const paymentRoutes = express.Router();

paymentRoutes.put("/add-money", addMoney);
paymentRoutes.put("/pay-money", payMoney);
paymentRoutes.put("/request-money", requestMoney);
paymentRoutes.put("/reject-payment", rejectPayment);
