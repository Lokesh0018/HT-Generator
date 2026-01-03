import { React, useRef, useState, useEffect, useContext } from "react";
import { FaRegEdit, FaPlus } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { ToastContext } from "../../Toast";

const Invigilators = () => {
    const { showToastMsg } = useContext(ToastContext);
    const [showCard, setShowCard] = useState(null);
    const admin = JSON.parse(localStorage.getItem("admin"));
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const cardRef = useRef(null);

    const handleCancle = () => {
        setShowCard(null);
        setSelectedRow(null);
    }
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

    const addStudent = () => { }
    const editStudent = () => { }
    const deleteStudent = () => { }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showCard && cardRef.current && !cardRef.current.contains(event.target)) {
                handleCancle();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showCard]);


    const handleEditChange = (key, value) => {
        setSelectedRow(prev => ({
            ...prev,
            [key]: value
        }));
    };
    return (
        <>
            {(showCard === "addCard") &&
                <div className="stuCard" ref={cardRef}>
                    <div className="cardHeader">
                        <h2>Add New Student</h2>
                    </div>
                    <div className="cardForm stu">
                        <table className="cardTable">
                            <tr>
                                <td>Id</td>
                                <td><input type="text" className="cardLable" id="id" required /></td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td><input type="text" className="cardLable" id="name" required /></td>
                            </tr>
                            <tr>
                                <td>Father Name</td>
                                <td><input type="text" className="cardLable" id="fatherName" required /></td>
                            </tr>
                        </table>
                    </div>
                    <div className="saveChanges">
                        <button className="saveBtn" onClick={addStudent}>Add Student</button>
                    </div>
                </div>
            }
            {(showCard === "editCard") &&
                <div className="stuCard" ref={cardRef}>
                    <div className="cardHeader">
                        <h2>Update Student</h2>
                    </div>

                    <div className="cardForm">
                        <table className="cardTable">
                            <tr>
                                <td>Id</td>
                                <td><input type="text" className="cardLable disable" value={selectedRow.id} readOnly /></td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td><input type="text" className="cardLable" value={selectedRow.name} onChange={(e) => handleEditChange("name", e.target.value)} required /></td>
                            </tr>
                            <tr>
                                <td>Father Name</td>
                                <td><input type="text" className="cardLable" value={selectedRow.fatherName} onChange={(e) => handleEditChange("fatherName", e.target.value)} required /></td>
                            </tr>
                        </table>
                    </div>
                    <div className="saveChanges">
                        <button className="saveBtn" onClick={editStudent}>Save Changes</button>
                    </div>
                </div>
            }
            {(showCard === "delCard") &&
                <div className="deleteCard" ref={cardRef}>
                    <div className="cardHeader">
                        <h2>Delete Exam</h2>
                    </div>
                    <div className="deleteContent">
                        <p>Are you sure you want to delete the student <strong>{selectedRow.id}</strong> ?</p>
                    </div>
                    <div className="delActions">
                        <button className="cancelBtn" onClick={handleCancle}>Cancel</button>
                        <button className="deleteBtn" onClick={deleteStudent}>Delete</button>
                    </div>
                </div>
            }
            <div className={`invigilators ${showCard ? "blur" : ""}`}>

                <div className="pageHeader">
                    <div className="pageTitle">Invigilators Management</div>
                    <button className="addBtn" onClick={addCard}><FaPlus />Add New Invigilator</button>
                </div>

                <div className={`studentContent ${showCard ? "blur" : ""}`}>
                    <div className="studentContainer">
                        <div className="tableContainer">
                            <table className="table">
                                <thead>
                                    <tr className="rowHead">
                                        <td className="cellHead">S.no</td>
                                        <td className="cellHead">Id</td>
                                        <td className="cellHead">Name</td>
                                        <td className="cellHead">Branch</td>
                                        <td className="cellHead">Block</td>
                                        <td className="cellHead">Room</td>
                                        <td className="cellHead">Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((stu, idx) => (
                                        <tr key={idx}>
                                            <td className="cellBody">{idx + 1}</td>
                                            <td className="cellBody">{stu.id}</td>
                                            <td className="cellBody">{stu.name}</td>
                                            <td className="cellBody">{admin.branch}</td>
                                            <td className="cellBody">{admin.year}</td>
                                            <td className="cellBody">{admin.semester}</td>
                                            <td className="cellBody">
                                                <FaRegEdit className="editIc" onClick={() => editCard(stu)} />
                                                <MdDeleteOutline className="delIc" onClick={() => delCard(stu)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Invigilators;