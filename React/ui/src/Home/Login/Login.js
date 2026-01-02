import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../../Toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ props }) => {
  const navigate = useNavigate();
  const login = props;
  const [showPassword, setShowPassword] = useState(false);

  const { showToastMsg } = useContext(ToastContext);

  const handleSubmit = () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      showToastMsg("emptyFields");
      return;
    }
    if (login === "Admin") {
      fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: username,
          password: password
        })
      }).then(res => {
        if (!res.ok) {
          if (res.status === 401)
            throw new Error("invalidCredentials");
          if (res.status >= 500)
            throw new Error("serverError");
        }
        return res.json();
      }).then(data => {
        localStorage.setItem("admin", JSON.stringify(data));
        showToastMsg("success");
        navigate("/admin", { replace: true });
      }).catch(err => {
        localStorage.removeItem("data");
        showToastMsg(err.message || "serverError");
      });
    }
    else {}
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="loginHeader">{login} Login</div>

        <div className="loginContent">
          <div className="loginDetails">
            <span className="loginLable">User Id :</span>
            <input
              type="text"
              placeholder="Enter Username"
              id="username"
              className="loginIp"
            />
          </div>

          <div className="loginDetails">
            <span className="loginLable">Password :</span>
            <input
              type={(showPassword ? "text" : "password")}
              placeholder="Enter Password"
              id="password"
              className="loginIp"
            />
            <span className="eyeIc" onClick={() => setShowPassword(!showPassword)}>{(showPassword) ? <FaEye /> : <FaEyeSlash />}</span>
          </div>

          <div className="loginDetails">
            <button className="loginBtn" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
