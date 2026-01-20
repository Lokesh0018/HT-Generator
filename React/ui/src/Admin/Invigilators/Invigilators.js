import { React, useRef, useState, useEffect, useContext } from "react";
import { FaRegEdit, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { BiReset } from "react-icons/bi";
import { ToastContext } from "../../Toast";

const Invigilators = () => {
    const { showToastMsg } = useContext(ToastContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showCard, setShowCard] = useState(null);
    const admin = JSON.parse(localStorage.getItem("admin"));
    const [data, setData] = useState([{
        id: "invigi001",
        password: "123",
        name: "sp1",
        branch: "CSE",
        block: "A",
        room: "LH-18"
    }]);
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
    const resetCard = () => {
        setShowCard("resetCard");
    };

    const addInvigilator = () => {
        const id = document.getElementById("id").value.toUpperCase().replace(/\s/g, "");
        const name = document.getElementById("name").value.trim();
        const password = document.getElementById("password").value.trim();
        const branch = document.getElementById("branch").value.trim();
        const block = document.getElementById("block").value.trim();
        const room = document.getElementById("room").value.trim();  
        if (!id || !name || !password || !branch || !block || !room) {
            showToastMsg("emptyFields");
            return;
        }
        const entity = JSON.stringify({
            "id": id,
            "name": name,
            "password": password,
            "branch": branch,
            "block": block,
            "room": room,
            "section": ''
        });
        fetch('http://localhost:8081/admin/invigilators', {
            method : "POST",
            headers : { "Content-type" : "application/json" },
            body : entity
        }).then((res) => {
            if(!res.ok)
                throw new Error("serverError");
            return res.json();
        }).then((data) => {
            showToastMsg("add");
            setData(data);
            setShowCard(null);
            localStorage.setItem("invigilator", JSON.stringify(data));
        }).catch((err) => {
            showToastMsg(err.message || "serverError");
        })
    }
    const editInvigilator = () => { }
    const deleteInvigilator = () => { }
    const resetVerifications = () => { }



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
                        <h2>Add New Invigilator</h2>
                    </div>
                    <div className="cardForm">
                        <table className="cardTable">
                            <tr>
                                <td>Id</td>
                                <td><input type="text" className="cardLable" id="id" required /></td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <input type={(showPassword ? "text" : "password")} className="cardLable" id="password" required />
                                    <span className="eyeIc invi" onClick={() => setShowPassword(!showPassword)}>{(showPassword) ? <FaEye /> : <FaEyeSlash />}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td><input type="text" className="cardLable" id="name" required /></td>
                            </tr>
                            <tr>
                                <td>Branch</td>
                                <td><input type="text" className="cardLable" id="branch" required /></td>
                            </tr>
                            <tr>
                                <td>Block</td>
                                <td><input type="text" className="cardLable" id="block" required /></td>
                            </tr>
                            <tr>
                                <td>Room</td>
                                <td><input type="text" className="cardLable" id="room" required /></td>
                            </tr>
                        </table>
                    </div>
                    <div className="saveChanges">
                        <button className="saveBtn" onClick={addInvigilator}>Add Invigilator</button>
                    </div>
                </div>
            }
            {(showCard === "editCard") &&
                <div className="stuCard" ref={cardRef}>
                    <div className="cardHeader">
                        <h2>Update Invigilator</h2>
                    </div>

                    <div className="cardForm">
                        <table className="cardTable">
                            <tr>
                                <td>Id</td>
                                <td><input type="text" className="cardLable disable" value={selectedRow.id} readOnly /></td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <input type={(showPassword ? "text" : "password")} className="cardLable" value={selectedRow.password} onChange={(e) => handleEditChange("password", e.target.value)} required />
                                    <span className="eyeIc invi" onClick={() => setShowPassword(!showPassword)}>{(showPassword) ? <FaEye /> : <FaEyeSlash />}</span>

                                </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td><input type="text" className="cardLable" value={selectedRow.name} onChange={(e) => handleEditChange("name", e.target.value)} required /></td>
                            </tr>
                            <tr>
                                <td>Branch</td>
                                <td><input type="text" className="cardLable" value={selectedRow.branch} onChange={(e) => handleEditChange("branch", e.target.value)} required /></td>
                            </tr>
                            <tr>
                                <td>Block</td>
                                <td><input type="text" className="cardLable" value={selectedRow.block} onChange={(e) => handleEditChange("block", e.target.value)} required /></td>
                            </tr>
                            <tr>
                                <td>Room</td>
                                <td><input type="text" className="cardLable" value={selectedRow.room} onChange={(e) => handleEditChange("room", e.target.value)} required /></td>
                            </tr>
                        </table>
                    </div>
                    <div className="saveChanges">
                        <button className="saveBtn" onClick={editInvigilator}>Save Changes</button>
                    </div>
                </div>
            }
            {(showCard === "delCard") &&
                <div className="deleteCard" ref={cardRef}>
                    <div className="cardHeader">
                        <h2>Delete Invigilator</h2>
                    </div>
                    <div className="deleteContent">
                        <p>Are you sure you want to delete the student <strong>{selectedRow.id}</strong> ?</p>
                    </div>
                    <div className="delActions">
                        <button className="cancelBtn" onClick={handleCancle}>Cancel</button>
                        <button className="deleteBtn" onClick={deleteInvigilator}>Delete</button>
                    </div>
                </div>
            }
            {(showCard === "resetCard") &&
                <div className="deleteCard" ref={cardRef}>
                    <div className="cardHeader">
                        <h2>Reset Verifications</h2>
                    </div>
                    <div className="resetContent">
                        <p>Are you sure you want to reset the verifications ?</p>
                    </div>
                    <div className="delActions">
                        <button className="cancelBtn" onClick={handleCancle}>Cancel</button>
                        <button className="deleteBtn" onClick={resetVerifications}>Reset</button>
                    </div>
                </div>
            }
            <div className={`invigilators ${showCard ? "blur" : ""}`}>
                <div className="pageHeader">
                    <div className="pageTitle">
                        Invigilators Management
                        <button className="addBtn" onClick={resetCard}><BiReset /></button>
                    </div>
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