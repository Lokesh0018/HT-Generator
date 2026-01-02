import { React, useContext, useEffect, useRef, useState } from "react";
import { TbCircleLetterIFilled } from 'react-icons/tb';
import { FaEye } from 'react-icons/fa';
import { LiaWpforms } from 'react-icons/lia';
import { NavLink } from "react-router-dom";
import { ToastContext } from "../Toast";
import { CgProfile } from 'react-icons/cg';
import { BsQrCodeScan } from "react-icons/bs";
import { TbQrcodeOff } from "react-icons/tb";
import { MdOutlineVerified } from "react-icons/md";

const Invigilator = () => {
    const { showToastMsg } = useContext(ToastContext);
    const [data, setData] = useState([]);
    const [students, setStudents] = useState([]);
    const [showCard, setShowCard] = useState(null);
    const [showQr, setShowQr] = useState(false);
    const branch = JSON.parse(localStorage.getItem("admin")).branch;
    const year = JSON.parse(localStorage.getItem("admin")).year;
    const sem = JSON.parse(localStorage.getItem("admin")).semester;
    const viewRef = useRef(null);
    const videoRef = useRef(null);
    useEffect(() => {
        setStudents(JSON.parse(localStorage.getItem("students")));
        setData(JSON.parse(localStorage.getItem("students")));
    }, []);
    const verifyStudent = () => {
        setShowCard(null);
    }
    useEffect(() => {
        if (!showQr) return;

        let stream;

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(s => {
                stream = s;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(err => console.error("Camera error:", err));

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [showQr]);

    const logout = () => {
        localStorage.removeItem("invigilator");
    }
    const handleViewCard = (id) => {
        const student = data.find(s => s.id === id);
        setShowCard(student);
    }
    const updateAction = (id, approve) => {
        setStudents(prev =>
            prev.map(stu =>
                stu.id === id ? { ...stu, approve: approve } : stu,
            )
        );

        fetch(`http://localhost:8081/admin/halltickets/${id}`, {
            method: "PUT"
        }).then((res) => {
            if (!res.ok)
                throw new Error("serverError");
            else
                showToastMsg("update");
        }).then((data) => {
            localStorage.setItem("students", JSON.stringify(students));
        }).catch((err) => {
            showToastMsg(err.message || "serverError");
        })
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showCard && viewRef.current && !viewRef.current.contains(event.target))
                setShowCard(null);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showCard]);
    return (
        <div className="invigilator">
            {(showCard) && (
                <div className="stuDetailsHomeContainer invigilatorStu" ref={viewRef}>
                    <div className="stuDetailsHomeHeader">
                        <LiaWpforms className="detailsCardIc" /> <h1>Details</h1>
                    </div>
                    <hr />
                    <div className="stuDetailsHomeBody">
                        <img src={`data:image/jpeg;base64,${showCard.imgData}`} className="stuDetailsImgHome" />
                        <table>
                            <tr>
                                <td>Name :</td>
                                <td>{showCard.name}</td>
                            </tr>
                            <tr>
                                <td>Id :</td>
                                <td>{showCard.id}</td>
                            </tr>
                            <tr>
                                <td>Branch :</td>
                                <td>{branch}</td>
                            </tr>
                            <tr>
                                <td>Year :</td>
                                <td>{year}</td>
                            </tr>
                            <tr>
                                <td>Semester :</td>
                                <td>{sem}</td>
                            </tr>
                        </table>
                    </div>
                    <button className="addBtn" onClick={verifyStudent}><MdOutlineVerified />Verify</button>
                </div>
            )}
            <div className="invigilatorHeader">
                <div className="adminLogo"><TbCircleLetterIFilled /></div>
                <div className="adminTitle"><h2>Invigilator</h2></div>
                <div className="adminHeader">
                    <div className="profileLogo">

                        <NavLink to="/invigilator/settings">
                            <CgProfile />
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className={`invigilatorContent ${showCard ? "blur" : ""}`}>
                <div className="invigilatorStudents">
                    <div className="pageHeader">
                        <div className="pageTitle">Students</div>
                    </div>
                    <div className="tableContainer">
                        <table className="table">
                            <thead>
                                <tr className="rowHead">
                                    <td className="cellHead">S.no</td>
                                    <td className="cellHead">Id</td>
                                    <td className="cellHead">Name</td>
                                    <td className="cellHead">Branch</td>
                                    <td className="cellHead">View</td>
                                    <td className="cellHead">Action</td>
                                </tr>
                            </thead>

                            <tbody>
                                {students.map((stu, idx) => (
                                    <tr key={idx}>
                                        <td className="cellBody">{idx + 1}</td>
                                        <td className="cellBody">{stu.id}</td>
                                        <td className="cellBody">{stu.name}</td>
                                        <td className="cellBody">{branch}</td>
                                        <td className="cellBody"><FaEye className="viewIc" onClick={() => handleViewCard(stu.id)} /></td>

                                        <td className="cellBody">
                                            <input
                                                type="checkbox"
                                                checked={stu.approve}
                                                onChange={(e) =>
                                                    updateAction(stu.id, !stu.approve)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="invigilatorStudents">
                    <div className="pageHeader">
                        <div className="pageTitle">QR Scanner</div>
                    </div>
                    <div className="tableContainer qrScannerContainer">
                        <div className="qrScanner">
                            {showQr ?
                                (<>
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        muted
                                        playsInline
                                    />
                                    <button className="addBtn" onClick={() => setShowQr(false)} ><TbQrcodeOff />Cancle</button>

                                </>
                                )
                                :
                                (
                                    <button className="qrStartBtn" onClick={() => setShowQr(true)}>
                                        <BsQrCodeScan />
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Invigilator;
