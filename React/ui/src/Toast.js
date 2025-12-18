import React, { createContext, useState } from "react";
import { LuInfo } from "react-icons/lu";
import { FaRegCircleCheck } from "react-icons/fa6";
import { BiErrorCircle } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";

export const ToastContext = createContext();

const ToastProvider = ({ children }) => {
    const [toastData, setToastData] = useState(null);
    const [showToast, setShowToast] = useState(false);

    const toastMap = {
        success: {
            head: "Success",
            color: "#269b24",
            icon: <FaRegCircleCheck />,
            msg: "Verification Success"
        },
        add: {
            head: "Success",
            color: "#269b24",
            icon: <FaRegCircleCheck />,
            msg: "Added Successfully"
        },
        update: {
            head: "Success",
            color: "#269b24",
            icon: <FaRegCircleCheck />,
            msg: "Updated Successfully"
        },
        delete: {
            head: "Success",
            color: "#269b24",
            icon: <FaRegCircleCheck />,
            msg: "Deleted Successfully"
        },
        sent: {
            head: "Success",
            color: "#269b24",
            icon: <FaRegCircleCheck />,
            msg: "OTP Sent Successfully"
        },
        emptyFields: {
            head: "Info",
            color: "#124fff",
            icon: <LuInfo />,
            msg: "All fields are required"
        },
        emptyMsg: {
            head: "Info",
            color: "#124fff",
            icon: <LuInfo />,
            msg: "Message is required"
        },
        clgEmail: {
            head: "Info",
            color: "#124fff",
            icon: <LuInfo />,
            msg: "Collage Email is required"
        },
        invalidCredentials: {
            head: "Error",
            color: "#d10d0d",
            icon: <BiErrorCircle />,
            msg: "Invalid Credentials"
        },
        serverError: {
            head: "Error",
            color: "#d10d0d",
            icon: <BiErrorCircle />,
            msg: "Something went wrong"
        },
        invalidYear: {
            head: "Error",
            color: "#d10d0d",
            icon: <BiErrorCircle />,
            msg: "Invalid Year"
        },
        invalidSem: {
            head: "Error",
            color: "#d10d0d",
            icon: <BiErrorCircle />,
            msg: "Invalid Semester"
        },
        notRegistered: {
            head: "Error",
            color: "#d10d0d",
            icon: <BiErrorCircle />,
            msg: "Not Registered contact admin"
        },
        notApproved: {
            head: "Error",
            color: "#d10d0d",
            icon: <BiErrorCircle />,
            msg: "Not Approved contact admin"
        }
    };

    const showToastMsg = (type) => {
        const toast = toastMap[type];
        if (!toast)
            setToastData(toastMap.serverError);
        else
            setToastData(toast);
        requestAnimationFrame(() => {
            setShowToast(true);
        });
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToastMsg }}>
            {children}

            {toastData && (
                <div className={`toast ${showToast ? "show" : ""}`}>
                    <div
                        className="toastWave"
                        style={{ backgroundColor: toastData.color }}
                    ></div>
                    <div className="toastContent">
                        <div className="toastHeader">
                            <div className="toastHead" style={{ color: toastData.color }}>
                                <span className="toastIc">{toastData.icon}</span>
                                <h1>{toastData.head}</h1>
                            </div>
                            <div className="toastClose" onClick={() => setShowToast(false)}>
                                <IoCloseOutline />
                            </div>
                        </div>
                        <div className="toastBody">
                            <p className="toastMsg">{toastData.msg}</p>
                        </div>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
};

export default ToastProvider;
