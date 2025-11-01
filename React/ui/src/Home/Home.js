import React from "react";
import { NavLink } from "react-router-dom";
import { LuSend } from 'react-icons/lu';

const Home = () => {
    return (
        <div className="home">
            <div className="homeHeader">
                <div className="homeHeading">
                    <u><h1>Hall Ticket Generator</h1></u>
                </div>
                <NavLink to="/login" className="adminLoginBtnContainer"><button className="adminLoginBtn">Login</button></NavLink>
            </div>
            <form className="homeContent">
                <div className="homeDetails">
                <span className="homeLable">Email :&nbsp;</span>
                <input type="email" className="homeIp" placeholder="Enter Your Collage Mail Id" required />
                <button type="submit" className="sendIc"><LuSend /></button>
                </div>
            </form>
        </div>
    );
}

export default Home;

