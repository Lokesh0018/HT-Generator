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
      <h1>Login</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="button" onClick={create}>Login</button>
    </div>
  );
};

export default Login;
