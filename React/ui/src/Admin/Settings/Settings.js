import React from "react";
import { MdLogout } from 'react-icons/md';

const Settings = () => {
    return (
        <div className="settings">
            <div className="pageHeader">
                <div className="pageTitle">Profile Settings</div>
            </div>
            <div className="settingsContainer">
                    <h3>Admin Name:</h3>
                <div className="detailsContainer">
                    <span className="value">John Doe</span>
                </div>
                    <h3 className="label">Admin Email:</h3>
                <div className="detailsContainer">
                    <span className="value"></span>
                </div>
                    <h3 className="label">Collage Name:</h3>
                <div className="detailsContainer">
                    <span className="value"></span>
                </div>
            </div>
                <button className="logoutBtn">Logout<MdLogout /></button>
        </div>
    );
}

export default Settings;