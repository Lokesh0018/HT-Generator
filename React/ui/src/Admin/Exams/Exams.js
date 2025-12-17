import { React, useState, useEffect, useRef, useContext } from "react";
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { FaCirclePlus } from 'react-icons/fa6';
import { ToastContext } from "../../Toast";

const Exams = () => {

    const { showToastMsg } = useContext(ToastContext);

    const [data, setData] = useState([]);
    const regulation = JSON.parse(localStorage.getItem("admin")).regulation;
    const [year, setYear] = useState(1);
    const [sem, setSem] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:8081/admin/exams/${year}/${sem}`, {
            method: "GET"
        }).then((res) => {
            if (!res.ok)
                throw new Error("serverError");
            return res.json();
        }).then((data) => {
            setData(data);
        }).catch((err) => {
            showToastMsg(err.message || "serverError");
        });
    }, [year, sem]);

    const addSubject = () => {
        const subCode = document.getElementById("subCode").value;
        const sub = document.getElementById("sub").value;
        const date = document.getElementById("date").value;
        const stTime = document.getElementById("stTime").value;
        const enTime = document.getElementById("enTime").value;

        if (!subCode || !sub || !date || !stTime || !enTime) {
            showToastMsg("emptyFields");
            return;
        }

        fetch('http://localhost:8081/admin/exams', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "subCode": subCode,
                "year": year,
                "semester": sem,
                "sub": sub,
                "date": date,
                "time": stTime + " - " + enTime
            })
        }).then((res) => {
            if (!res.ok)
                throw new Error("serverError");
            return res.json();
        }).then((data) => {
            showToastMsg("add");
            setData(data);
            setShowCard(null);
        }).catch((err) => {
            showToastMsg(err.message || "serverError");
        });
    };

    const editSubject = () => {
        const subCode = selectedRow.subCode;
        const year = selectedRow.year;
        const sem = selectedRow.semester
        const sub = selectedRow.sub;
        const date = selectedRow.date;
        const stTime = selectedRow.time.split(" - ")[0];
        const enTime = selectedRow.time.split(" - ")[1];

        if(!subCode || !sub || !date || !stTime || !enTime){
            showToastMsg("emptyFields");
            return;
        }

        fetch('http://localhost:8081/admin/exams', {
            method : "PUT",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify({
                "subCode" : subCode,
                "year" : year,
                "semester" : sem,
                "sub" : sub,
                "date" : date,
                "time" : stTime + " - " + enTime
            })        
        }).then((res) => {
            if(!res.ok)
                throw new Error("serverError");
            return res.json();
        }).then((data) => {
            showToastMsg("update");
            setData(data);
            setShowCard(null);
        }).catch((err) => {
            showToastMsg(err.message || "serverError");
        });
    }

    const delSubject = () => {
        fetch('http://localhost:8081/admin/exams',{
            method : "DELETE",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify({
                "subCode" : selectedRow.subCode,
                "year" : selectedRow.year,
                "semester" : selectedRow.semester,
                "sub" : selectedRow.sub,
                "date" : selectedRow.date,
                "time" : selectedRow.time
            })
        }).then((res) => {
            if(!res.ok)
                throw new Error("serverError");
            return res.json();
        }).then((data) => {
            showToastMsg("delete");
            setData(data);
            setShowCard(null);
        }).catch((err) => {
            showToastMsg(err.message || "serverError");
        });
    };

    const [showCard, setShowCard] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const cardRef = useRef(null);

    const addCard = () => {
        setShowCard("addCard");
    };

    const editCard = (row) => {
        setSelectedRow(row);
        setShowCard("editCard");
    };

    const delCard = (row) => {
        setSelectedRow(row);
        setShowCard("delCard");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showCard && cardRef.current && !cardRef.current.contains(event.target)) {
                handleCancel();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showCard]);

    const handleCancel = () => {
        setShowCard(null);
        setSelectedRow(null);
    };

    const handleEditChange = (key, value) => {
        setSelectedRow(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="exams">
            {(showCard === "addCard" &&
                <div ref={cardRef} className="subCard">
                    <div className="cardHeader">
                        <h2>Add New Subject</h2>
                    </div>
                    <div className="cardForm">
                        <table className="cardTable">
                            <tr>
                                <td>Regulation</td>
                                <td><input type="text" className="cardLable disable" value={`${regulation}`} readOnly /></td>
                            </tr>
                            <tr>
                                <td>Sub Code</td>
                                <td><input type="text" className="cardLable" id="subCode"  /></td>
                            </tr>
                            <tr>
                                <td>Subject</td>
                                <td><input type="text" className="cardLable" id="sub"  /></td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td><input type="date" className="cardLable" id="date"  /></td>
                            </tr>
                            <tr>
                                <td>Start Time</td>
                                <td><input type="time" className="cardLable" id="stTime"  /></td>
                            </tr>
                            <tr>
                                <td>End Time</td>
                                <td><input type="time" className="cardLable" id="enTime"  /></td>
                            </tr>
                        </table>
                    </div>
                    <div className="saveChanges">
                        <button className="saveBtn" onClick={addSubject}>Add Subject</button>
                    </div>
                </div>
            )}
            {(showCard === "editCard" &&
                <div ref={cardRef} className="subCard">
                    <div className="cardHeader">
                        <h2>Edit Exam Details</h2>
                    </div>
                    <div className="cardForm">
                        <table className="cardTable">
                            <tr>
                                <td>Regulation</td>
                                <td><input type="text" className="cardLable disable" value={"AR20"} readOnly /></td>
                            </tr>
                            <tr>
                                <td>Sub Code</td>
                                <td><input type="text" className="cardLable disable" id="subCode" value={selectedRow.subCode} readOnly /></td>
                            </tr>
                            <tr>
                                <td>Subject</td>
                                <td><input type="text" className="cardLable" id="sub" value={selectedRow.sub} onChange={(e) => handleEditChange("sub", e.target.value)}  /></td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td><input type="date" className="cardLable" id="date" value={selectedRow.date} onChange={(e) => handleEditChange("date", e.target.value)}  /></td>
                            </tr>
                            <tr>
                                <td>Start Time</td>
                                <td><input type="time" className="cardLable" id="stTime" value={selectedRow.time.split(" - ")[0]} onChange={(e) => handleEditChange("time", `${e.target.value} - ${selectedRow.time.split(" - ")[1]}`)}  /></td>
                            </tr>
                            <tr>
                                <td>End Time</td>
                                <td><input type="time" className="cardLable" id="enTime" value={selectedRow.time.split(" - ")[1]} onChange={(e) => handleEditChange("time", `${selectedRow.time.split(" - ")[0]} - ${e.target.value}`)} /></td>
                            </tr>
                        </table>
                    </div>
                    <div className="saveChanges">
                        <button className="saveBtn" onClick={editSubject}>Save Changes</button>
                    </div>
                </div>)}
            {(showCard === "delCard" &&
                <div ref={cardRef} className="deleteCard">
                    <div className="cardHeader">
                        <h2>Delete Exam</h2>
                    </div>
                    <div className="deleteContent">
                        <p>Are you sure you want to delete the exam for <strong>{selectedRow.sub}</strong> scheduled on <strong>{selectedRow.date}</strong> at <strong>{selectedRow.time}</strong>?</p>
                    </div>
                    <div className="delActions">
                        <button className="cancelBtn" onClick={handleCancel}>Cancel</button>
                        <button className="deleteBtn" onClick={delSubject}>Delete</button>
                    </div>
                </div>
            )}
            <div className={`examsContent ${showCard ? 'blur' : ''}`}>
                <div className="pageHeader">
                    <div className="pageTitle">Exams Management</div>
                </div>
                <div className="examSelector">
                    <div className="examCard">
                        <select className="yearSelect" onChange={(e) => setYear(e.target.value)}>
                            <option value="1">First Year</option>
                            <option value="2">Second Year</option>
                            <option value="3">Third Year</option>
                            <option value="4">Fourth Year</option>
                        </select>
                        <select className="semSelect" onChange={(e) => setSem(e.target.value)}>
                            <option value="1">Semester 1</option>
                            <option value="2">Semester 2</option>
                        </select>
                    </div>
                </div>
                <div className="examContainer">
                    <div className="tabHeader">
                        <div className="tabTitle">
                            Time Table
                        </div>
                        <button className="addSubBtn" onClick={addCard}><FaCirclePlus />Add Subject</button>
                    </div>
                    <div className="tableContainer examTable">
                        <table className="table">
                            <thead>
                                <tr className="rowHead">
                                    <td className="cellHead">S.no</td>
                                    <td className="cellHead">Sub Code</td>
                                    <td className="cellHead">Subject</td>
                                    <td className="cellHead">Date</td>
                                    <td className="cellHead">Time</td>
                                    <td className="cellHead">Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((exam, idx) => (
                                    <tr key={idx}>
                                        <td className="cellBody">{idx + 1}</td>
                                        <td className="cellBody">{exam["subCode"]}</td>
                                        <td className="cellBody">{exam["sub"]}</td>
                                        <td className="cellBody">{exam["date"]}</td>
                                        <td className="cellBody">{exam["time"]}</td>
                                        <td className="cellBody">
                                            <FaRegEdit data-testid="edit-icon" className="editIc" onClick={() => editCard(exam)} />
                                            <MdDeleteOutline data-testid="delete-icon" className="delIc" onClick={() => delCard(exam)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Exams;