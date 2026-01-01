import React from "react";
import { useNavigate } from "react-router-dom";


const LoginSelection = () => {
    const navigate = useNavigate();
    const handleSelect = (e) => {
        if(e.target.id === "admin")
            navigate("/login/admin");
        else
            navigate("/login/invigilator");
    }
    return (
        <>
            <div className="login">
                <div className="loginContainer lcSelect">
                    <div className="loginContent lcContent">
                        <div className="loginDetails">
                            <button className="loginBtn lbSelect" id="admin" onClick={handleSelect}>
                                Admin
                            </button>
                        </div>
                        <div className="loginDetails">
                            <button className="loginBtn lbSelect" id="invigilator" onClick={handleSelect}>
                                Invigilator
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginSelection;