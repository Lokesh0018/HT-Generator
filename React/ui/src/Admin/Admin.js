import { React, useState } from "react";
import { CgProfile } from 'react-icons/cg';
import { Routes, Route, NavLink } from "react-router-dom";
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
                <Navigation />
            </aside>
            <div className="adminMain">
                <div className="adminHeader">
                    <div className="profileLogo">
                        <NavLink to="/admin/settings">
                            <CgProfile onClick={select} />
                        </NavLink>
                    </div>
                </div>
                <div className="adminContent">
                    <Routes>
                        <Route path="/" element={<DashBoard />} />
                        <Route path="/exams" element={<Exams />} />
                        <Route path="/students" element={<Students />} />
                        <Route path="/halltickets" element={<HallTickets />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Admin;