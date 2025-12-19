import React, { useContext, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { LuSend } from "react-icons/lu";
import { LiaWpforms } from 'react-icons/lia';
import { ToastContext } from "../Toast";

const Home = () => {
  const { showToastMsg } = useContext(ToastContext);


  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState("otp");

  const otpRef = useRef([]);

  const verifyEmail = (e) => {
    e.preventDefault();
    const mailDomain = email.split("@")[1];

    if (mailDomain === "raghuinstech.com") {
      fetch(`http://localhost:8081/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "email": email
        })
      }).then((res) => {
        if (!res.ok)
          if (res.status === 409)
            throw new Error("notRegistered");
          else if (res.status === 401)
            throw new Error("notApproved");
          else
            throw new Error("serverError");
        return res.text();
      }).then((data) => {
        showToastMsg("sent");
        setDisable("email");
      }).catch((err) => {
        showToastMsg(err.message || "serverError");
      })
    }
    else {
      showToastMsg("clgEmail");
      return;
    }
  }

  const verifyOtp = (e) => {
    e.preventDefault();
    const otp = otpRef.current.map((input) => input.value).join("");
    if (otp.length < 4) {
      showToastMsg("invalidOtp");
      return;
    }
    fetch('http://localhost:8081/verify-otp', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "email": email,
        "otp": otp
      })
    }).then((res) => {
      if (!res.ok)
        if (res.status === 409)
          throw new Error("otpExpired");
        else if (res.status === 401)
          throw new Error("invalidOtp");
        else
          throw new Error("serverError");
      return res.json();
    }).then((data) => {
      showToastMsg("success");
      setDisable("emailOtp");
      setData(data);
      localStorage.setItem("student", JSON.stringify(data));
    }).catch((err) => {
      showToastMsg(err.message || "serverError");
    })
  }

  const confirmDetails = () => {
    const year = data.year;
    const sem = data.semester;

    fetch('http://localhost:8081/hallticket', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "year": year,
        "sem": sem
      })
    }).then((res) => {
      if (!res.ok)
        throw new Error("serverError");
      return res.json();
    }).then((data) => {
      localStorage.setItem("exams", JSON.stringify(data));
      window.location.href = "/hallTicket";
    }).catch((err) => {
      showToastMsg(err.message || "serverError");
    })
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

      <form className={`homeContent ${(disable === "email" || disable === "emailOtp") ? "hc1 disable" : "hc1"}`} onSubmit={verifyEmail}>
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
      <form className={`homeContent ${(disable === "otp" || disable === "emailOtp") ? "hc2 disable" : "hc2"}`} onSubmit={verifyOtp}>
        <div className={`homeDetails hd2`}>
          <span className="homeLable">OTP :&nbsp;&nbsp;&nbsp; </span>
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
                required
              />
            ))}
          </div>
        </div>

        <button type="submit" className="verifyBtn vb1">
          Verify
        </button>
      </form>
      {(disable === "emailOtp") && (
        <div className="stuDetailsHome">
          <div className="stuDetailsHomeContainer">
            <div className="stuDetailsHomeHeader">
              <LiaWpforms className="detailsCardIc" /> <h1>Details</h1>
            </div>
            <hr />
            <div className="stuDetailsHomeBody">
              <div className="stuDetailsImgHome"><img src={`data:${data.imgType};base64,${data.imgData}`} alt="" /></div>
              <table>
                <tr>
                  <td>Name :</td>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <td>Id :</td>
                  <td>{data.id}</td>
                </tr>
                <tr>
                  <td>Branch :</td>
                  <td>{data.branch}</td>
                </tr>
                <tr>
                  <td>Year :</td>
                  <td>{data.year}</td>
                </tr>
                <tr>
                  <td>Semester :</td>
                  <td>{data.semester}</td>
                </tr>
              </table>
            </div>
          </div>
          <button type="submit" className="verifyBtn vb2" onClick={confirmDetails}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;