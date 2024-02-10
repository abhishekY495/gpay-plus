import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { userData } = useSelector((state) => state.user);
  return userData ? children : <Navigate to="/login" />;
};
