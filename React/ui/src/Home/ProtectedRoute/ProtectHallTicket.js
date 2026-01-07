import React from "react";
import { Navigate } from "react-router-dom";

const ProtectHallTicket = ({ children }) => {
  const isAuth = localStorage.getItem("student");
  if (!isAuth) 
    return <Navigate to="/" replace />;
  return children;
};

export default ProtectHallTicket;