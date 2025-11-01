import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const create = () => {
    localStorage.setItem("token", "admin");
    navigate("/admin");
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="loginHeader">
          Admin Login
        </div>
        <div className="loginContent">
          <div className="loginDetails">
            <span className="loginLable">Username :</span>
            <input type="text" placeholder="Enter Username" className="loginIp" />
          </div>
          <div className="loginDetails">
            <span className="loginLable">Password :</span>
            <input type="password" placeholder="Enter Password" className="loginIp" />
          </div>
          <div className="loginDetails">
            <button className="loginBtn" onClick={create}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
