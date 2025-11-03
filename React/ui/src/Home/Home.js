import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { LuSend, LuInfo } from "react-icons/lu";
import { FaRegCircleCheck } from "react-icons/fa6";
import { BiErrorCircle } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";

const Home = () => {
  const toastMap = {
    success: {
      head: "Success",
      color: "#269b24",
      icon: <FaRegCircleCheck />,
      msg: "Verification Success",
    },
    errorMail: {
      head: "Error",
      color: "#d10d0d",
      icon: <BiErrorCircle />,
      msg: "User not registerd",
    },
    errorOtp: {
      head: "Error",
      color: "#d10d0d",
      icon: <BiErrorCircle />,
      msg: "OTP is invalid",
    },
    exception: {
      head: "Error",
      color: "#d10d0d",
      icon: <BiErrorCircle />,
      msg: "Some thing went Wrong",
    },
    info: {
      head: "Info",
      color: "#124fff",
      icon: <LuInfo />,
      msg: "Use Collage Mail Id",
    },
  };

  const [toastData, setToastData] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const otpRef = useRef([]);
  const [disable, setDisable] = useState(true);

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    e.target.value = value;
    if (value && idx < otpRef.current.length - 1) {
      otpRef.current[idx + 1].focus();
    }
  };

  const handleBack = (e, idx) => {
    if (e.key === "Backspace" && !e.target.value && idx > 0) {
      otpRef.current[idx - 1].focus();
    }
  };

  const otpVerify = (e) => {
    e.preventDefault();
    const mailDomain = document.querySelector(".homeIp").value.split("@")[1];
    if (mailDomain !== "raghuinstech.com") {
      showToastMsg("info");
    } else {
      showToastMsg("Ssccess");
    }
  };

  const showToastMsg = (type) => {
    setToastData(toastMap[type]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  return (
    <div className="home">
      <div className="homeHeader">
        <div className="homeHeading">
          <u>
            <h1>Hall Ticket Generator</h1>
          </u>
        </div>
        <NavLink to="/login" className="adminLoginBtnContainer">
          <button className="adminLoginBtn">Login</button>
        </NavLink>
      </div>

      <form className="homeContent" onSubmit={otpVerify}>
        <div className="homeDetails">
          <span className="homeLable">Email :&nbsp;</span>
          <input
            type="email"
            className="homeIp"
            placeholder="Enter Your College Mail Id"
            required
          />
          <button type="submit" className="sendIc">
            <LuSend />
          </button>
        </div>

        <div className="homeDetails">
          <span className="homeLable">OTP :&nbsp;&nbsp;&nbsp;</span>
          <div className="homeOtp">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                type="text"
                className="otpIp"
                maxLength={1}
                ref={(e) => (otpRef.current[i] = e)}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleBack(e, i)}
                disabled={disable}
                required
              />
            ))}
          </div>
        </div>

        <button type="submit" className="verifyBtn" disabled={disable}>
          Verify
        </button>
      </form>

      {toastData && (
        <div className={`toast ${showToast ? "show" : ""}`}>
          <div
            className="toastWave"
            style={{ backgroundColor: toastData.color }}
          ></div>
          <div className="toastContent">
            <div className="toastHeader">
              <div className="toastHead" style={{ color: toastData.color }}>
                <span className="toastIc">{toastData.icon}</span>
                <h1>{toastData.head}</h1>
              </div>
              <div className="toastClose" onClick={() => setShowToast(false)}>
                <IoCloseOutline />
              </div>
            </div>
            <div className="toastBody">
              <p className="toastMsg">{toastData.msg}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
