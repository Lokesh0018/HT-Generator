import React from "react";
import { Navigate } from "react-router-dom";

const ProtectInvigilator = ({ children }) => {
    const isAuth = localStorage.getItem("invigilator");
    if(!isAuth)
        return <Navigate to="/login/invigilator" replace/>;
    return children;
}

export default ProtectInvigilator;