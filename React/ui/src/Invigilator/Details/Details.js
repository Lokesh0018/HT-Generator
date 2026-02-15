import { React } from "react";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const Details = () => {
    const data = (JSON.parse(localStorage.getItem("invigilator")));
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("student");
        localStorage.removeItem("invigilator");
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
                    <span className="value">{data.block}</span>
                </div>

                <h3 className="label">Room:</h3>
                <div className="detailsContainer">
                    <span className="value">{data.room}</span>
                </div>
                <button className="logoutBtn invi" onClick={logout}>
                    Logout <MdLogout />
                </button>
            </div>
        </div>
    );
}

export default Details;