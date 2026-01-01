import React from "react";
import { Navigate } from "react-router-dom";

const ProtectAdmin = ({ children }) => {
  const isAuth = localStorage.getItem("admin");
  if (!isAuth) 
    return <Navigate to="/login/admin" replace />;
  return children;
};

export default ProtectAdmin;
