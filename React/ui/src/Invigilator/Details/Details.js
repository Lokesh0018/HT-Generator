import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const Details = () => {
    const [data, setData] = useState(JSON.parse(localStorage.getItem("admin")));

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("student");
        localStorage.removeItem("admin");
        navigate("/login", { replace: true });
    };
    return (
        <div className="invigilatorDetails">
            <div className="pageTitle">Details</div>
            <div className="settingsContainer DC">
                <h3>Invigilator Id:</h3>
                <div className="detailsContainer">
                    <span className="value">{data.id}</span>
                </div>

                <h3>Invigilator Name:</h3>
                <div className="detailsContainer">
                    <span className="value">{data.name}</span>
                </div>

                <h3 className="label">Branch:</h3>
                <div className="detailsContainer">
                    <span className="value">{data.branch}</span>
                </div>

                <h3 className="label">Block:</h3>
                <div className="detailsContainer">
                    <span className="value">{data.collageName}</span>
                </div>

                <h3 className="label">Room:</h3>
                <div className="detailsContainer">
                    <span className="value">{data.email}</span>
                </div>
                <button className="logoutBtn" onClick={logout}>
                    Logout <MdLogout />
                </button>
            </div>
        </div>
    );
}

export default Details;