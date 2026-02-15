import { React } from "react";
import { CgProfile } from 'react-icons/cg';
import { Routes, Route, NavLink } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import DashBoard from "./DashBoard/DashBoard";
import Exams from "./Exams/Exams";
import Students from "./Students/Students";
import HallTickets from "./HallTickets/HallTickets";
import Invigilators from "./Invigilators/Invigilators";
import Settings from "./Settings/Settings";
import ProtectAdmin from "../Home/ProtectedRoute/ProtectAdmin";

const Admin = () => {
    const authToken = localStorage.getItem("token");
    return (
        <div className="admin">
            <aside className="adminSideBar">
                <Navigation />
            </aside>
            <div className="adminMain">
                <div className="adminHeader">
                    <div className="profileLogo">
                        <NavLink to="/admin/settings">
                            <CgProfile />
                        </NavLink>
                    </div>
                </div>
                <div className="adminContent">
                    <Routes>
                        <Route path="/" element={
                            <ProtectAdmin isAuth={authToken}>
                                <DashBoard />
                            </ProtectAdmin>
                        } />
                        <Route path="/exams" element={
                            <ProtectAdmin isAuth={authToken}>
                                <Exams />
                            </ProtectAdmin>
                        } />
                        <Route path="/students" element={
                            <ProtectAdmin isAuth={authToken}>
                                <Students />
                            </ProtectAdmin>
                        } />
                        <Route path="/halltickets" element={
                            <ProtectAdmin isAuth={authToken}>
                                <HallTickets />
                            </ProtectAdmin>
                        } />
                        <Route path="/invigilators" element={
                            <ProtectAdmin isAuth={authToken}>
                                <Invigilators />
                            </ProtectAdmin>
                        } />
                        <Route path="/settings" element={
                            <ProtectAdmin isAuth={authToken}>
                                <Settings />
                            </ProtectAdmin>
                        } />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Admin;