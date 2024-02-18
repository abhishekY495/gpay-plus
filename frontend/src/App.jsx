import React, { useEffect, useState } from "react";
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
import { SentRequestsPage } from "./pages/SentRequestsPage";
import { ReceivedRequestsPage } from "./pages/ReceivedRequestsPage";
import { DisclaimerModal } from "./components/Modals/DisclaimerModal";
import { Footer } from "./components/Footer";
import { checkServerIsLive } from "./utils/checkServerIsLive";

export const App = () => {
  const { userToken, userData } = useSelector((state) => state.user);
  const [serverLive, setServerLive] = useState(false);
  const [showMessage, setShowMessage] = useState(
    localStorage.getItem("msg") === "false" ? false : true
  );
  const dispatch = useDispatch();

  useEffect(() => {
    checkServerIsLive(setServerLive);
    if (!userData) {
      dispatch(validateUser(userToken));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 mb-36">
        {showMessage && <DisclaimerModal serverLive={serverLive} />}
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
            path="/sent-requests"
            element={
              <ProtectedRoute>
                <SentRequestsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/received-requests"
            element={
              <ProtectedRoute>
                <ReceivedRequestsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/user/:username" element={<PublicProfilePage />} />
          <Route
            path="/*"
            element={
              <p className="text-center mt-6 font-bold text-3xl">
                404 Not Found
              </p>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
