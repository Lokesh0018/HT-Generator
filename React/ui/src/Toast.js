import { React, createContext, useState } from "react";

import { LuInfo } from "react-icons/lu";
import { FaRegCircleCheck } from "react-icons/fa6";
import { BiErrorCircle } from "react-icons/bi";

export const Toast = createContext();

const ToastProvider = ({ child }) => {

    const toastMap = {
        success: {
            head: "Success",
            color: "#269b24",
            icon: <FaRegCircleCheck />,
            msg: "Verification Success",
        },
        emptyFields: {
            head: "Info",
            color: "#124fff",
            icon: <LuInfo />,
            msg: "Username and Password are required",
        },

        invalidCredentials: {
            head: "Error",
            color: "#d10d0d",
            icon: <BiErrorCircle />,
            msg: "Invalid Credentials",
        },
        serverError: {
            head: "Error",
            color: "#d10d0d",
            icon: <BiErrorCircle />,
            msg: "Some thing went Wrong",
        }
    };

    const [toastData, setToastData] = useState(null);
    const [showToast, setShowToast] = useState(false);

    const showToastMsg = (toast) => {
        setToastData(toast);
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    return (
        <Toast.Provider value={{ showToastMsg }}>
            {child}
            {toastData && (
                <div className={`toast ${showToast ? "show" : ""}`}>
                    <div
                        className="toastWave"
                        style={{ backgroundColor: toastData.color }}
                    ></div>

                    <div className="toastContent">
                        <div className="toastHeader">
                            <div
                                className="toastHead"
                                style={{ color: toastData.color }}
                            >
                                <span className="toastIc">{toastData.icon}</span>
                                <h1>{toastData.head}</h1>
                            </div>
                        </div>

                        <div className="toastBody">
                            <p>{toastData.msg}</p>
                        </div>
                    </div>
                </div>
            )}
        </Toast.Provider>
    );
}

export default ToastProvider;