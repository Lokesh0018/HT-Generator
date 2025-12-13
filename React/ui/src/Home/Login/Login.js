import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../Toast";

const Login = () => {
  const navigate = useNavigate();
  const { showToastMsg } = useContext()

  const handleSubmit = () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      showToastMsg("emptyFields");
      return;
    }
    fetch("http://localhost:8081/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "id": username,
        "password": password
      })
    }).then(res => {
        if(!res.ok){
          if(res.status === 401)
            throw new Error("invalidCredentials");
          if (res.status >= 500)
            throw new Error("serverError");
        }
        return res.json();
      })
      .then(data => {
        localStorage.setItem("data", JSON.stringify(data));
        showToastMsg("success");
        localStorage.setItem("token" , "true");
        navigate("/admin");
      })
      .catch(err => {
        if(toastMap[err.message])
          showToastMsg(err.message);
        else
          showToastMsg("serverError");
      });
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
            <input type="text" placeholder="Enter Username" id="username" className="loginIp" required />
          </div>
          <div className="loginDetails">
            <span className="loginLable">Password :</span>
            <input type="password" placeholder="Enter Password" id="password" className="loginIp" required />
          </div>
          <div className="loginDetails">
            <button className="loginBtn" onClick={handleSubmit}>Login</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
