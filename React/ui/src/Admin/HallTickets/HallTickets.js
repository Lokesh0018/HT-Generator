import { React, useContext, useEffect, useRef, useState } from "react";
import { FaEye } from 'react-icons/fa';
import { LiaWpforms } from 'react-icons/lia';
import { ToastContext } from "../../Toast";

const HallTickets = () => {
    const { showToastMsg } = useContext(ToastContext);

    const [data, setData] = useState([]);
    const regulation = JSON.parse(localStorage.getItem("admin")).regulation;
    const branch = JSON.parse(localStorage.getItem("admin")).branch;
    const year = JSON.parse(localStorage.getItem("admin")).year;
    const sem = JSON.parse(localStorage.getItem("admin")).semester;
    const section = JSON.parse(localStorage.getItem("admin")).section;


    const [students, setStudents] = useState(data);
    const [showCard, setShowCard] = useState(null);

    const viewRef = useRef(null);

    const approveAll = () => {
        setStudents(prev => {
            return prev.map(stu => {
                return { ...stu, approve: true }
            })
        });

        fetch(`http://localhost:8081/admin/halltickets/approveAll/${section}`, {
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

    const handleViewCard = (id) => {
        const student = data.find(s => s.id = id);
        setShowCard(student);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showCard && viewRef.current && !viewRef.current.contains(event.target))
                setShowCard(null);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showCard]);

    useEffect(() => {
        const storedData = localStorage.getItem("students");
        if (!storedData) {
            fetch(`http://localhost:8081/admin/students/${section}`, {
                method: "GET"
            }).then((res) => {
                if (!res.ok)
                    showToastMsg("serverError");
                return res.json();
            }).then((data) => {
                setData(data);
                setStudents(data);
                localStorage.setItem("students", JSON.stringify(data));
            })
        }
        else {
            setData(JSON.parse(storedData));
            setStudents(JSON.parse(storedData));
        }
    }, [])

    return (
        <>
            {(showCard) && (
                <div className="stuDetailsHomeContainer sdh" ref={viewRef}>
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
                </div>
            )}
            <div className={`hallTickets ${showCard ? "blur" : ""}`}>
                <div className="pageHeader">
                    <div className="pageTitle">HallTickets Management</div>
                    <button className="addBtn" onClick={approveAll}>Approve All</button>
                </div>

                <div className="hallTicketsContainer">
                    <div className="tableContainer">
                        <table className="table">
                            <thead>
                                <tr className="rowHead">
                                    <td className="cellHead">S.no</td>
                                    <td className="cellHead">Id</td>
                                    <td className="cellHead">Name</td>
                                    <td className="cellHead">Regulation</td>
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
                                        <td className="cellBody">{regulation}</td>
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
            </div>
        </>
    );
};

export default HallTickets;
