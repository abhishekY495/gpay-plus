import express from "express";

import { payUser } from "../controllers/paymentController.js";

export const paymentRoutes = express.Router();

paymentRoutes.put("/pay-user", payUser);
