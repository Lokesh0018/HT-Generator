import React from "react";
import { MdUpcoming } from 'react-icons/md';
import { GiGraduateCap } from 'react-icons/gi';
import { BsFillPassFill } from 'react-icons/bs';

const DashBoard = () => {
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
                        <button className="cardBtn">View Exams</button>
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
                        <button className="cardBtn">View Students</button>
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
                        <button className="cardBtn">View Hall Tickets</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;