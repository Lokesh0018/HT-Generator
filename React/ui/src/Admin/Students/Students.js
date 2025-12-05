import { React, useEffect, useRef, useState } from "react";
import { FaPlus } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const Students = () => {

    const data = [
        {
            "S.no": 1,
            "Id": "233J5A0513",
            "Name": "Munakala Lokesh",
            "Email": "233j5a0513@raghuinstech.com",
            "Branch": "CSE",
            "Year": 4,
            "Semester": 1
        },
        {
            "S.no": 2,
            "Id": "233J5A0513",
            "Name": "Munakala Lokesh",
            "Email": "233j5a0513@raghuinstech.com",
            "Branch": "CSE",
            "Year": 4,
            "Semester": 1
        }
    ];

    const [selectedRow, setSelectedRow] = useState(null);

    const addStuRef = useRef(null);
    const editStuRef = useRef(null);
    const delStuRef = useRef(null);

    const [showCard, setShowCard] = useState(null);

    const addStudent = () => {
        document.querySelector('.studentContent').classList.add('blur');
        setShowCard("addStu");
    }
    const editStudent = (stu) => {
        setSelectedRow(stu);
        document.querySelector('.studentContent').classList.add('blur');
        setShowCard("editStu");
    }
    const deleteStudent = (stu) => {
        setSelectedRow(stu);
        document.querySelector('.studentContent').classList.add('blur');
        setShowCard("delStu");
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showCard && addStuRef.current && !addStuRef.current.contains(event.target)) {
                setShowCard(null);
                document.querySelector('.studentContent').classList.remove('blur');
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showCard]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showCard && editStuRef.current && !editStuRef.current.contains(event.target)) {
                setShowCard(null);
                document.querySelector('.studentContent').classList.remove('blur');
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showCard]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showCard && delStuRef.current && !delStuRef.current.contains(event.target)) {
                setShowCard(null);
                document.querySelector('.studentContent').classList.remove('blur');
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showCard]);

    const handleCancle = () => {
        setShowCard(null);
        setSelectedRow(null);
        document.querySelector('.studentContent').classList.remove('blur');
    }

    const handleDelete = () => {
        window.location.reload();
    }

    return (
        <div className="students">
            {(showCard === "addStu") &&
                <div className="stuCard" ref={addStuRef}>
                    <div className="cardHeader">
                        <h2>Add New Student</h2>
                    </div>
                    <div className="cardForm">
                        <table className="cardTable">
                            <tr>
                                <td>Id</td>
                                <td><input type="text" className="cardLable" required /></td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td><input type="text" className="cardLable" required /></td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td><input type="text" className="cardLable" required /></td>
                            </tr>
                            <tr>
                                <td>Branch</td>
                                <td><input type="text" className="cardLable" required /></td>
                            </tr>
                            <tr>
                                <td>Year</td>
                                <td><input type="text" className="cardLable" required /></td>
                            </tr>
                            <tr>
                                <td>Semester</td>
                                <td><input type="text" className="cardLable" required /></td>
                            </tr>
                        </table>
                    </div>
                    <div className="saveChanges">
                        <button className="saveBtn">Add Subject</button>
                    </div>
                </div>
            }
            {(showCard === "editStu") &&
                <div className="stuCard" ref={editStuRef}>
                    <div className="cardHeader">
                        <h2>Update Student</h2>
                    </div>
                    <div className="cardForm">
                        <table className="cardTable">
                            <tr>
                                <td>Id</td>
                                <td><input type="text" className="cardLable" value={selectedRow.Id} required /></td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td><input type="text" className="cardLable" value={selectedRow.Name} required /></td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td><input type="text" className="cardLable" value={selectedRow.Email} required /></td>
                            </tr>
                            <tr>
                                <td>Branch</td>
                                <td><input type="text" className="cardLable" value={selectedRow.Branch} required /></td>
                            </tr>
                            <tr>
                                <td>Year</td>
                                <td><input type="text" className="cardLable" value={selectedRow.Year} required /></td>
                            </tr>
                            <tr>
                                <td>Semester</td>
                                <td><input type="text" className="cardLable" value={selectedRow.Semester} required /></td>
                            </tr>
                        </table>
                    </div>
                    <div className="saveChanges">
                        <button className="saveBtn">Save Changes</button>
                    </div>
                </div>
            }
            {(showCard === "delStu") &&
                <div className="deleteCard" ref={delStuRef}>
                    <div className="cardHeader">
                        <h2>Delete Exam</h2>
                    </div>
                    <div className="deleteContent">
                        <p>Are you sure you want to delete the student <strong>{selectedRow.Id}</strong> ?</p>
                    </div>
                    <div className="delActions">
                        <button className="cancelBtn" onClick={handleCancle}>Cancel</button>
                        <button className="deleteBtn" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            }
            <div className="studentContent">
                <div className="pageHeader">
                    <div className="pageTitle">Students Management</div>
                    <button className="addBtn" onClick={addStudent}><FaPlus />Add New Student</button>
                </div>
                <div className="studentContainer">
                    <div className="tableContainer">
                        <table className="table">
                            <thead>
                                <tr className="rowHead">
                                    <td className="cellHead">S.no</td>
                                    <td className="cellHead">Id</td>
                                    <td className="cellHead">Name</td>
                                    <td className="cellHead">Email</td>
                                    <td className="cellHead">Branch</td>
                                    <td className="cellHead">Year</td>
                                    <td className="cellHead">Semester</td>
                                    <td className="cellHead">Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((stu) => (
                                    <tr key={stu.key}>
                                        <td className="cellBody">{stu["S.no"]}</td>
                                        <td className="cellBody">{stu["Id"]}</td>
                                        <td className="cellBody">{stu["Name"]}</td>
                                        <td className="cellBody">{stu["Email"]}</td>
                                        <td className="cellBody">{stu["Branch"]}</td>
                                        <td className="cellBody">{stu["Year"]}</td>
                                        <td className="cellBody">{stu["Semester"]}</td>
                                        <td className="cellBody">
                                            <FaRegEdit className="editIc" onClick={() => editStudent(stu)} />
                                            <MdDeleteOutline className="delIc" onClick={() => deleteStudent(stu)} />
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

export default Students;