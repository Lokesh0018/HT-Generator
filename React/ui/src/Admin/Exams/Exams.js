import { React, useState, useEffect, useRef } from "react";
import { FaPlus } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { FaCirclePlus } from 'react-icons/fa6';
import { EditTimeTable } from "../../Cards/EditTimeTable";
const Exams = () => {
    const data = [
        {
            "S.no": 1,
            "Sub Code": "20CS501",
            "Subject": "Data Structures",
            "Date": "2024-03-15",
            "Time": "10:00 AM - 12:00 PM"
        },
        {
            "S.no": 2,
            "Sub Code": "20CS502",
            "Subject": "Algorithms",
            "Date": "2024-03-17",
            "Time": "2:00 PM - 4:00 PM"
        }
    ];
    const editCardRef = useRef(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showEditCard, setShowEditCard] = useState(false);

    const edit = (row) => {
        document.querySelector('.examsContent').classList.add('blur');
        setSelectedRow(row);
        setShowEditCard(true);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showEditCard && editCardRef.current && !editCardRef.current.contains(event.target)) {
                setShowEditCard(false);
                setSelectedRow(null);
                document.querySelector('.examsContent').classList.remove('blur');
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showEditCard]);





    return (
        <div className="exams">
            {(showEditCard && <div ref={editCardRef}><EditTimeTable selectedRow={selectedRow} /></div>)}
            <div className="examsContent">
                <div className="pageHeader">
                    <div className="pageTitle">Exams Management</div>
                    <button className="addBtn"><FaPlus />Add New Student</button>
                </div>
                <div className="examSelector">
                    <div className="examCard">
                        <select className="semSelect">
                            <option value="midterm">Midterm Exam - March 2024</option>
                            <option value="final">Final Exam - June 2024</option>
                        </select>
                        <select className="examSelect">
                            <option value="math101">Math 101</option>
                            <option value="phy101">Physics 101</option>
                        </select>
                    </div>
                </div>
                <div className="examContainer">
                    <div className="tabHeader">
                        <div className="tabTitle">
                            Time Table
                        </div>
                        <button className="addSubBtn"><FaCirclePlus />Add Subject</button>
                    </div>
                    <div className="tableCard">
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
                                    <tr key={exam.key}>
                                        <td className="cellBody">{exam["S.no"]}</td>
                                        <td className="cellBody">{exam["Sub Code"]}</td>
                                        <td className="cellBody">{exam["Subject"]}</td>
                                        <td className="cellBody">{exam["Date"]}</td>
                                        <td className="cellBody">{exam["Time"]}</td>
                                        <td className="cellBody">
                                            <FaRegEdit className="editIc" onClick={() => edit(exam)} />
                                            <MdDeleteOutline className="delIc" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>


                        </table>
                        {/* {selectedRow && (
                        <div className="selectedDetails">
                            <h4>Selected Subject Details</h4>
                            <p><strong>S.no:</strong> {selectedRow["S.no"]}</p>
                            <p><strong>Sub Code:</strong> {selectedRow["Sub Code"]}</p>
                            <p><strong>Subject:</strong> {selectedRow["Subject"]}</p>
                            <p><strong>Date:</strong> {selectedRow["Date"]}</p>
                            <p><strong>Time:</strong> {selectedRow["Time"]}</p>
                            <button onClick={() => setSelectedRow(null)} className="clearBtn">
                                Clear Selection
                            </button>
                        </div>
                    )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Exams;