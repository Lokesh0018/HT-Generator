import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdUpcoming } from 'react-icons/md';
import { GiGraduateCap } from 'react-icons/gi';
import { BsFillPassFill } from 'react-icons/bs';
import { IoIosMail } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { ToastContext } from "../../Toast";

const DashBoard = () => {

    const { showToastMsg } = useContext(ToastContext);

    const [data, setData] = useState(null);

    const [sending, setSending] = useState(false);


    useEffect(() => {
        const storedData = localStorage.getItem("admin");
        if(storedData)
            setData(JSON.parse(storedData));
    },[]);

    const map = data ? new Map(Object.entries(data)) : new Map();
    const handleNotify = () => {
        const message = document.querySelector(".notifyArea").value.trim();

        if(!message){
            showToastMsg("emptyMsg");
            return;
        }

        const section = map.get("section");
        setSending(true);
        fetch(`http://localhost:8081/admin`,{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(message)
        }).then(res => {
            if(!res.ok)
                throw new Error("serverError");
            showToastMsg("success");
        }).catch(err => {
            showToastMsg(err.message || "serverError");
        }).finally(() => {
            setSending(false);
        });
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
                            <span>{map.get("upComingExams")}</span>
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
                            <span>Total Students :</span>
                            <span>{map.get("students")}</span>
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
                            <span>Allocated Hall Tickets :</span>
                            <span>{map.get("approvedHallTickets")}</span>
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
                        <button className={`cardBtnContainer dbc-2 ${sending ? "disable" : ""}`} type="submit" onClick={handleNotify} disabled={sending}><FiSend />Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;