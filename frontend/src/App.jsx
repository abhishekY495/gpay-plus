import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { PublicProfilePage } from "./pages/PublicProfilePage";
import { PayOrRequestPage } from "./pages/PayOrRequestPage";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { validateUser } from "./features/userSlice";
import { TransactionsPage } from "./pages/TransactionsPage";
import { RequestedPaymentsPage } from "./pages/RequestedPaymentsPage";
import { ReceivedPaymentRequestsPage } from "./pages/ReceivedPaymentRequestsPage";

export const App = () => {
  const { userToken, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) {
      dispatch(validateUser(userToken));
    }
  }, []);

  return (
    <div className="mb-36">
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pay-or-request"
          element={
            <ProtectedRoute>
              <PayOrRequestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/requested-payments"
          element={
            <ProtectedRoute>
              <RequestedPaymentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/received-payment-requests"
          element={
            <ProtectedRoute>
              <ReceivedPaymentRequestsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/user/:username" element={<PublicProfilePage />} />
        <Route path="/*" element={<p>404 Not Found</p>} />
      </Routes>
    </div>
  );
};
