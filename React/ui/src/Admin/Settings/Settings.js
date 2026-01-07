import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdLogout, MdOutlineSave } from "react-icons/md";
import { ToastContext } from "../../Toast";


const Settings = () => {

    const { showToastMsg } = useContext(ToastContext);

    const [data, setData] = useState(JSON.parse(localStorage.getItem("admin")));

    const updateAdmin = () => {
        const branch = data.branch;
        const year = data.year;
        const semester = data.semester;

        if (!branch || !year || !semester) {
            showToastMsg("emptyFields");
            return;
        }
        else if (year.length > 1) {
            showToastMsg("invalidYear");
            return;
        }
        else if (semester.length > 1) {
            showToastMsg("invalidSem");
            return;
        }

        fetch("http://localhost:8081/admin/settings", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(res => {
            if (!res.ok)
                return new Error("serverError");
            return res.json();
        }).then((data) => {
            showToastMsg("update");
            localStorage.setItem("admin", JSON.stringify(data));
        }).catch((err) => {
            showToastMsg(err.message || "serverError");
        })

    }

    const [activeTab, setActiveTab] = useState(false);
    const [changed, setChanged] = useState(false);

    const handleChange = (key, value) => {
        setData(prev => ({
            ...prev,
            [key]: value
        }));
        setChanged(true);
    }

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("student");
        localStorage.removeItem("admin");
        navigate("/login", { replace: true });
    };

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
                        <h3>Admin Id:</h3>
                        <div className="detailsContainer">
                            <span className="value">{data.id}</span>
                        </div>

                        <h3>Admin Name:</h3>
                        <div className="detailsContainer">
                            <span className="value">{data.name}</span>
                        </div>

                        <h3 className="label">Admin Email:</h3>
                        <div className="detailsContainer">
                            <span className="value">{data.email}</span>
                        </div>

                        <h3 className="label">College Name:</h3>
                        <div className="detailsContainer">
                            <span className="value">{data.collageName}</span>
                        </div>

                        <button className="logoutBtn" onClick={logout}>
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

                        <h3 className="label">Regulation:</h3>
                        <div className="detailsContainer">
                            <input className="value" type="text" value={data.regulation} onChange={(e) => handleChange("regulation", e.target.value)} />
                        </div>

                        <h3 className="label">Branch:</h3>
                        <div className="detailsContainer">
                            <input className="value" type="text" value={data.branch} onChange={(e) => handleChange("branch", e.target.value)} />
                        </div>

                        <h3 className="label">Year:</h3>
                        <div className="detailsContainer">
                            <input className="value" type="number" value={data.year} onChange={(e) => handleChange("year", e.target.value)} />
                        </div>

                        <h3 className="label">Semester:</h3>
                        <div className="detailsContainer">
                            <input className="value" type="number" value={data.semester} onChange={(e) => handleChange("semester", e.target.value)} />
                        </div>

                        <button className={`logoutBtn ${changed ? "" : "disable"}`} onClick={updateAdmin} >
                            save <MdOutlineSave />
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Settings;
