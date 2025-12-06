import React from "react";
import { NavLink } from "react-router-dom";
import { MdUpcoming } from 'react-icons/md';
import { GiGraduateCap } from 'react-icons/gi';
import { BsFillPassFill } from 'react-icons/bs';
import { IoIosMail } from "react-icons/io";
import { FiSend } from "react-icons/fi";

const DashBoard = () => {
    const handleNotify = () => {
        if(!document.querySelector(".notifyArea").value)
            alert("Fill");
    }
    return (
        <div className="dashBoard">
            <div className="pageTitle">
                Admin Dashboard
            </div>
            <div className="dashBoardCards">
                <div className="boardCard">
                    <div className="cardTitle">
                        Manage Exams
                    </div>
                    <div className="cardContent">
                        <div className="cardData">
                            <span><MdUpcoming /></span>
                            <span>Upcoming Exams :</span>
                            <span>3</span>
                        </div>
                        <NavLink to="/admin/exams" className="cardBtnContainer" ><button className="cardBtn">View Exams</button></NavLink>
                    </div>
                </div>
                <div className="boardCard">
                    <div className="cardTitle">
                        Manage Students
                    </div>
                    <div className="cardContent">
                        <div className="cardData">
                            <span><GiGraduateCap /></span>
                            <span>Registered Students :</span>
                            <span>150</span>
                        </div>
                        <NavLink to="/admin/students" className="cardBtnContainer"><button className="cardBtn">View Students</button></NavLink>
                    </div>
                </div>
                <div className="boardCard">
                    <div className="cardTitle">
                        Manage Hall Tickets
                    </div>
                    <div className="cardContent">
                        <div className="cardData">
                            <span><BsFillPassFill /></span>
                            <span>Generated Hall Tickets :</span>
                            <span>120</span>
                        </div>
                        <NavLink to="/admin/halltickets" className="cardBtnContainer"><button className="cardBtn">View Hall Tickets</button></NavLink>
                    </div>
                </div>
            </div>

            <div className="dashBoardCards dbc-2">
                <div className="boardCard dbc-2">
                    <div className="cardTitle">
                        Send Notification
                    </div>
                    <div className="cardContent dbc-2">
                        <div className="cardData dbc-2">
                            <span><IoIosMail /></span>
                            <span>Message :</span>
                            <textarea className="notifyArea" required></textarea>
                        </div>
                        <button className="cardBtnContainer dbc-2" type="submit" onClick={handleNotify}><FiSend />Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;