import { React, useState, useEffect, useRef } from "react";
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { FaCirclePlus } from 'react-icons/fa6';

const Exams = () => {
    const data = [
        {
            "S.no": 1,
            "Sub Code": "20CS501",
            "Subject": "Data Structures",
            "Date": "2024-03-15",
            "Time": "10:00 - 12:00"
        },
        {
            "S.no": 2,
            "Sub Code": "20CS502",
            "Subject": "Algorithms",
            "Date": "2024-03-17",
            "Time": "14:00 - 16:00"
        },
        {
            "S.no": 3,
            "Sub Code": "20CS501",
            "Subject": "Data Structures",
            "Date": "2024-03-15",
            "Time": "10:00 - 12:00"
        },
        {
            "S.no": 2,
            "Sub Code": "20CS502",
            "Subject": "Algorithms",
            "Date": "2024-03-17",
            "Time": "14:00 - 16:00"
        },
        {
            "S.no": 1,
            "Sub Code": "20CS501",
            "Subject": "Data Structures",
            "Date": "2024-03-15",
            "Time": "10:00 - 12:00"
        },
        {
            "S.no": 2,
            "Sub Code": "20CS502",
            "Subject": "Algorithms",
            "Date": "2024-03-17",
            "Time": "14:00 - 16:00"
        },
        {
            "S.no": 1,
            "Sub Code": "20CS501",
            "Subject": "Data Structures",
            "Date": "2024-03-15",
            "Time": "10:00 - 12:00"
        },
        {
            "S.no": 2,
            "Sub Code": "20CS502",
            "Subject": "Algorithms",
            "Date": "2024-03-17",
            "Time": "14:00 - 16:00"
        },
        {
            "S.no": 9,
            "Sub Code": "20CS501",
            "Subject": "Data Structures",
            "Date": "2024-03-15",
            "Time": "10:00 - 12:00"
        },
        {
            "S.no": 2,
            "Sub Code": "20CS502",
            "Subject": "Algorithms",
            "Date": "2024-03-17",
            "Time": "14:00 - 16:00"
        }
    ];

    const [showCard, setShowCard] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const cardRef = useRef(null);

    const addSub = () => {
        setShowCard("addSub");
    };

    const editRow = (row) => {
        setSelectedRow(row);
        setShowCard("editSub");
    };

    const deleteRow = (row) => {
        setSelectedRow(row);
        setShowCard("delSub");
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

    const handleDelete = () => {
        window.location.reload();
    };

    const handleCancel = () => {
        setShowCard(null);
        setSelectedRow(null);
    };

    return (
        <div className="exams">
            {(showCard==="addSub" &&
                <div ref={cardRef} className="subCard">
                    <div className="cardHeader">
                        <h2>Add New Subject</h2>
                    </div>
                    <div className="cardForm">
                        <table className="cardTable">
                            <tr>
                                <td>Regulation</td>
                                <td><input type="text" className="cardLable" value="AR20" readOnly /></td>
                            </tr>
                            <tr>
                                <td>Sub Code</td>
                                <td><input type="text" className="cardLable" required /></td>
                            </tr>
                            <tr>
                                <td>Subject</td>
                                <td><input type="text" className="cardLable" required /></td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td><input type="date" className="cardLable" required /></td>
                            </tr>
                            <tr>
                                <td>Start Time</td>
                                <td><input type="time" className="cardLable" required /></td>
                            </tr>
                            <tr>
                                <td>End Time</td>
                                <td><input type="time" className="cardLable" required /></td>
                            </tr>
                        </table>
                    </div>
                    <div className="saveChanges">
                        <button className="saveBtn">Add Subject</button>
                    </div>
                </div>
            )}
            {(showCard==="editSub" &&
                <div ref={cardRef} className="subCard">
                    <div className="cardHeader">
                        <h2>Edit Exam Details</h2>
                    </div>
                    <div className="cardForm">
                        <table className="cardTable">
                            <tr>
                                <td>S.no</td>
                                <td><input type="text" className="cardLable" value={selectedRow["S.no"]} readOnly /></td>
                            </tr>
                            <tr>
                                <td>Sub Code</td>
                                <td><input type="text" className="cardLable" value={selectedRow["Sub Code"]} required /></td>
                            </tr>
                            <tr>
                                <td>Subject</td>
                                <td><input type="text" className="cardLable" value={selectedRow["Subject"]} required /></td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td><input type="date" className="cardLable" value={selectedRow["Date"]} required /></td>
                            </tr>
                            <tr>
                                <td>Start Time</td>
                                <td><input type="time" className="cardLable" value={selectedRow["Time"] ? selectedRow["Time"].split(" - ")[0] : ""} required /></td>
                            </tr>
                            <tr>
                                <td>End Time</td>
                                <td><input type="time" className="cardLable" value={selectedRow["Time"] ? selectedRow["Time"].split(" - ")[1] : ""} required /></td>
                            </tr>
                        </table>
                    </div>
                    <div className="saveChanges">
                        <button className="saveBtn">Save Changes</button>
                    </div>
                </div>)}
            {(showCard==="delSub" &&
                <div ref={cardRef} className="deleteCard">
                    <div className="cardHeader">
                        <h2>Delete Exam</h2>
                    </div>
                    <div className="deleteContent">
                        <p>Are you sure you want to delete the exam for <strong>{selectedRow["Subject"]}</strong> scheduled on <strong>{selectedRow["Date"]}</strong> at <strong>{selectedRow["Time"]}</strong>?</p>
                    </div>
                    <div className="delActions">
                        <button className="cancelBtn" onClick={handleCancel}>Cancel</button>
                        <button className="deleteBtn" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
            <div className={`examsContent ${showCard ? 'blur' : ''}`}>
                <div className="pageHeader">
                    <div className="pageTitle">Exams Management</div>
                </div>
                <div className="examSelector">
                    <div className="examCard">
                        <select className="semSelect">
                            <option value="first">First Year</option>
                            <option value="second">Second Year</option>
                            <option value="third">Third Year</option>
                            <option value="fourth">Fourth Year</option>
                        </select>
                        <select className="examSelect">
                            <option value="sem1">Semester 1</option>
                            <option value="sem2">Semester 2</option>
                        </select>
                    </div>
                </div>
                <div className="examContainer">
                    <div className="tabHeader">
                        <div className="tabTitle">
                            Time Table
                        </div>
                        <button className="addSubBtn" onClick={addSub}><FaCirclePlus />Add Subject</button>
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
                                {data.map((exam) => (
                                    <tr key={exam["S.no"]}>
                                        <td className="cellBody">{exam["S.no"]}</td>
                                        <td className="cellBody">{exam["Sub Code"]}</td>
                                        <td className="cellBody">{exam["Subject"]}</td>
                                        <td className="cellBody">{exam["Date"]}</td>
                                        <td className="cellBody">{exam["Time"]}</td>
                                        <td className="cellBody">
                                            <FaRegEdit data-testid="edit-icon" className="editIc" onClick={() => editRow(exam)} />
                                            <MdDeleteOutline data-testid="delete-icon" className="delIc" onClick={() => deleteRow(exam)} />
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