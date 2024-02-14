import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { userData } = useSelector((state) => state.user);
  const location = useLocation();

  return userData ? (
    children
  ) : (
    <Navigate to="/login" state={{ prevUrl: location.pathname }} replace />
  );
};
