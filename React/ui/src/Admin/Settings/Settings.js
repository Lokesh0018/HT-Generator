import React, { useState } from "react";
import { MdLogout,MdOutlineSave  } from "react-icons/md";
const Settings = () => {
    const [activeTab, setActiveTab] = useState(false);

    return (
        <div className="settings">

            <ul className="settingsList">
                <li
                    className={activeTab === false ? "active" : ""}
                    onClick={() => setActiveTab(false)}
                >
                    General
                </li>

                <li
                    className={activeTab === true ? "active" : ""}
                    onClick={() => setActiveTab(true)}
                >
                    Profile
                </li>
            </ul>

            {(activeTab) ? (
                <div className="profileSettings">
                    <div className="pageHeader">
                        <div className="pageTitle">
                            Profile Settings
                        </div>
                    </div>
                    <div className="settingsContainer">
                        <h3>Admin Name:</h3>
                        <div className="detailsContainer">
                            <span className="value">John Doe</span>
                        </div>

                        <h3 className="label">Admin Email:</h3>
                        <div className="detailsContainer">
                            <span className="value">admin@example.com</span>
                        </div>

                        <h3 className="label">College Name:</h3>
                        <div className="detailsContainer">
                            <span className="value">ABC Engineering College</span>
                        </div>

                        <button className="logoutBtn">
                            Logout <MdLogout />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="generalSettings">
                    <div className="pageHeader">
                        <div className="pageTitle">
                            General Settings
                        </div>
                    </div>
                    <div className="settingsContainer">
                        <h3>Batch:</h3>
                        <div className="detailsContainer">
                            <span className="value">2023-2026</span>
                        </div>

                        <h3 className="label">Branch:</h3>
                        <div className="detailsContainer">
                            <input className="value" type="text" />
                        </div>

                        <h3 className="label">Year:</h3>
                        <div className="detailsContainer">
                            <input className="value" type="number" />
                        </div>

                        <h3 className="label">Semester:</h3>
                        <div className="detailsContainer">
                            <input className="value" type="number" />
                        </div>

                        <button className="logoutBtn">
                            save <MdOutlineSave/>
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Settings;
