import { React, useEffect, useState } from "react";
import { TbSquareRoundedLetterAFilled, TbWriting } from 'react-icons/tb';
import { LuLayoutDashboard, LuTickets } from 'react-icons/lu';
import { PiStudent } from 'react-icons/pi';
import { MdManageAccounts } from 'react-icons/md';
import { NavLink } from "react-router-dom";

const Navigation = () => {

  const [pressed,setPressed] = useState(false);

  const toggle = () => {
    setPressed(!pressed);
  }

  return (
    <div className={`navigation ${pressed ? 'expanded' : 'collapsed'}`}>
      <div className="navHeader">
        <div className="adminLogo" onClick={toggle}>
          <TbSquareRoundedLetterAFilled />
        </div>
        <div className={`adminTitle ${pressed ? '' : 'hide'}`}>
          <h2>Admin</h2>
        </div>
      </div>
      <div className="navItems">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => `navItem ${isActive ? "selected" : ""}`}
        >
          <div className="navIcon">
          <LuLayoutDashboard />
        </div>
          <span className={`navText ${pressed ? "" : "hide"}`}>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/exams"
            className={({isActive}) => `navItem ${isActive ? "selected" : ""}`}
        >
          <div className="navIcon">
            <TbWriting />
            </div>
            <span className={`navText ${pressed ? '' : 'hide'}`}>Exams</span>
        </NavLink>
        <NavLink to="/admin/students"
            className={({isActive}) => `navItem ${isActive ? "selected" : ""}`}
        >
          <div className="navIcon">
            <PiStudent />
            </div>
            <span className={`navText ${pressed ? '' : 'hide'}`}>Students</span>
        </NavLink>
        <NavLink to="/admin/halltickets"
            className={({isActive}) => `navItem ${isActive ? "selected" : ""}`}
        >
          <div className="navIcon">
            <LuTickets />
            </div>
            <span className={`navText ${pressed ? '' : 'hide'}`}>Hall&nbsp;Tickets</span>
        </NavLink>
        <NavLink to="/admin/settings"
            className={({isActive}) => `navItem ${isActive ? "selected" : ""}`}
        >
          <div className="navIcon">
            <MdManageAccounts />
            </div>
            <span className={`navText ${pressed ? '' : 'hide'}`}>Settings</span>
        </NavLink>

      </div>
    </div>
  );
};

export default Navigation;
