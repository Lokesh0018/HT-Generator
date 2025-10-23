import { React, useState } from "react";
import { CgProfile } from 'react-icons/cg';
import { Link, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import DashBoard from "./DashBoard/DashBoard";
import Exams from "./Exams/Exams";
import Students from "./Students/Students";
import HallTickets from "./HallTickets/HallTickets";
import Settings from "./Settings/Settings";

const Admin = () => {
    const [pressed, setPressed] = useState(false);
    const select = () => {
        setPressed(true);
    };
    const receive = () => {
        setPressed(false);
    };
    return (
        <div className="admin">
            <aside className="adminSideBar">
                <Navigation settings={pressed} sendDataToParent={receive} />
            </aside>
            <div className="adminMain">
                <div className="adminHeader">
                    <div className="profileLogo">
                        <Link to="/admin/settings">
                            <CgProfile onClick={select} />
                        </Link>
                    </div>
                </div>
                <div className="adminContent">
                    <Routes>
                        <Route path="/admin/dashboard" element={<DashBoard />} />
                        <Route path="/admin/exams" element={<Exams />} />
                        <Route path="/admin/students" element={<Students />} />
                        <Route path="/admin/hall-tickets" element={<HallTickets />} />
                        <Route path="/admin/settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Admin;