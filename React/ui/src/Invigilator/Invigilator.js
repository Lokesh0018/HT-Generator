import React from 'react';
import { TbCircleLetterIFilled } from 'react-icons/tb';
import { NavLink, Routes, Route } from "react-router-dom";
import { CgProfile } from 'react-icons/cg';
import Details from "./Details/Details";
import Home from "./Home/Home";

const Invigilator = () => {
    return (
        <div className="invigilator">
            <div className="invigilatorHeader">
                <NavLink className="adminLogo" to="/invigilator">
                    <TbCircleLetterIFilled />
                </NavLink>
                <div className="adminTitle"><h2>Invigilator</h2></div>
                <div className="adminHeader">
                    <div className="profileLogo">
                        <NavLink to="/invigilator/details">
                            <CgProfile />
                        </NavLink>
                    </div>
                </div>
            </div>
            <Routes>
                <Route path="/" element={
                    <Home />
                } />
                < Route path="/details" element={
                    < Details />
                } />
            </Routes >
        </div>
    );
};

export default Invigilator;
