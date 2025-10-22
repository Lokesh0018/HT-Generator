import { React, useEffect, useState } from "react";
import { TbSquareRoundedLetterAFilled, TbWriting } from 'react-icons/tb';
import { LuLayoutDashboard,LuTickets } from 'react-icons/lu';
import { PiStudent } from 'react-icons/pi';
import { MdManageAccounts } from 'react-icons/md';

const Navigation = ({ settings, sendDataToParent }) => {
  const [pressed, setPressed] = useState(true);
  const [selected, setSelected] = useState("dashboard");

  const toggle = () => {
    setPressed(!pressed);
  }
  
  useEffect(() => {
    if (settings === true) {
      setSelected("settings");
    }
  }, [settings]);
  
  useEffect(() => {
    if (selected !== "settings") {
      sendDataToParent();
    }
  }, [selected, sendDataToParent]);

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
        <div
          className={`navItem ${selected === "dashboard" ? 'selected' : ''}`}
          onClick={() => setSelected("dashboard")}
        >
          <LuLayoutDashboard />
          <span className={`navText ${pressed ? '' : 'hide'}`}>Dashboard</span>
        </div>

        <div
          className={`navItem ${selected === "exam" ? 'selected' : ''}`}
          onClick={() => setSelected("exam")}
        >
          <TbWriting />
          <span className={`navText ${pressed ? '' : 'hide'}`}>Exam</span>
        </div>

        <div
          className={`navItem ${selected === "students" ? 'selected' : ''}`}
          onClick={() => setSelected("students")}
        >
          <PiStudent />
          <span className={`navText ${pressed ? '' : 'hide'}`}>Students</span>
        </div>

        <div
          className={`navItem ${selected === "hallTicket" ? 'selected' : ''}`}
          onClick={() => setSelected("hallTicket")}
        >
          <LuTickets />
          <span className={`navText ${pressed ? '' : 'hide'}`}>Hall Tickets</span>
        </div>

        <div
          className={`navItem ${selected === "settings" ? 'selected' : ''}`}
          onClick={() => setSelected("settings")}
        >
          <MdManageAccounts />
          <span className={`navText ${pressed ? '' : 'hide'}`}>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
