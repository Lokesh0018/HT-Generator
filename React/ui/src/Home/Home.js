import React, { useContext, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { LuSend } from "react-icons/lu";
import { LiaWpforms } from 'react-icons/lia';
import { ToastContext } from "../Toast";

const Home = () => {
  const { showToastMsg } = useContext(ToastContext);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [disable, setDisable] = useState(true);
  const [verified, setVerified] = useState(true);

  const otpRef = useRef([]);

  const verifyEmail = (e) => {
    e.preventDefault();
    const mailDomain = email.split("@")[1];

    if (mailDomain === "raghuinstech.com") {
      fetch(`http://localhost:8081/${email}`, {
        method: "GET"
      }).then((res) => {
        console.log(res);
        if (!res.ok)
          if (res.status === 409)
            throw new Error("notRegistered");
          else if (res.status === 401)
            throw new Error("notApproved");
          else
            throw new Error("serverError");
      }).then((data) => {
        showToastMsg("sent");
        setDisable(false);
      }).catch((err) => {
        showToastMsg(err.message || "serverError");
      })
    }
    else {
      showToastMsg("clgEmail");
      return;
    }

  }

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

      <form className="homeContent hc1" onSubmit={verifyEmail}>
        <div className="homeDetails hd1">
          <span className="homeLable">Email :&nbsp;</span>
          <input
            type="email"
            id="email"
            className="homeIp"
            placeholder="Enter Your College Mail Id"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="sendIc">
            <LuSend />
          </button>
        </div>
      </form>
      <form className="homeContent hc2">
        <div className={`homeDetails ${disable ? "disable hd2" : "hd2"}`}>
          <span className="homeLable">OTP :&nbsp;&nbsp;&nbsp; </span>
          <div className="homeOtp">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                type="text"
                className={`otpIp ${disable ? "disable" : ""}`}
                maxLength={1}
                ref={(e) => (otpRef.current[i] = e)}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleBack(e, i)}
                required
              />
            ))}
          </div>
        </div>

        <button type="button" className={`verifyBtn ${disable ? "disable" : ""}`}>
          Verify
        </button>
      </form>
      {(verified) && (
        <div className="stuDetailsHome">
          <div className="stuDetailsHomeContainer">
            <div className="stuDetailsHomeHeader">
              <LiaWpforms className="detailsCardIc" /> <h1>Details</h1>
            </div>
            <hr />
            <div className="stuDetailsHomeBody">
              <div className="stuDetailsImgHome"><img /></div>
              <table>
                <tr>
                  <td>Name :</td>
                  <td>Munakala Lokesh</td>
                </tr>
                <tr>
                  <td>Id :</td>
                  <td>233J5A0513</td>
                </tr>
                <tr>
                  <td>Branch :</td>
                  <td>Computer Science and Engineering</td>
                </tr>
                <tr>
                  <td>Year :</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>Semester :</td>
                  <td>2</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      )}
      <button type="submit" className="verifyBtn" disabled={disable}>
        Confirm
      </button>
    </div>
  );
};

export default Home;
