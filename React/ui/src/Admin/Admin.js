import { React, useState } from "react";
import DashBoard from "./DashBoard/DashBoard";
import { CgProfile } from 'react-icons/cg';
import Navigation from "./Navigation/Navigation";

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
                        <CgProfile onClick={select} />
                    </div>
                </div>
                <div className="adminContent">
                    <DashBoard />
                </div>
            </div>
        </div>
    );
}

export default Admin;