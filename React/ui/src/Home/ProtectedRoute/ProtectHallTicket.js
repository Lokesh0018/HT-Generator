import React from "react";
import { Navigate } from "react-router-dom";

const ProtectHallTicket = ({ isAuth, children }) => {
  if (!isAuth) 
    return <Navigate to="/" replace />;
  return children;
};

export default ProtectHallTicket;