import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { validateUser } from "./features/userSlice";

export const App = () => {
  const { userToken, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) {
      dispatch(validateUser(userToken));
    }
  }, []);

  return (
    <div>
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
      </Routes>
    </div>
  );
};
