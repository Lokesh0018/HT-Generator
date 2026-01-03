import { React, useContext, useEffect, useRef, useState } from "react";
import { FaRegEdit, FaPlus } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { ToastContext } from "../../Toast";

const Students = () => {
    const { showToastMsg } = useContext(ToastContext);

    const admin = JSON.parse(localStorage.getItem("admin"));
    const [img, setImg] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const section = admin.section;
        fetch(`http://localhost:8081/admin/students/${section}`, {
            method: "GET"
        }).then((res) => {
            if (!res.ok)
                showToastMsg("serverError");
            return res.json();
        }).then((data) => {
            setData(data);
            localStorage.setItem("students", JSON.stringify(data));
        }).catch((err) => {
            showToastMsg(err.message || "serverError");
        });
    }, []);

    const addStudent = () => {
        const id = document.getElementById("id").value.toUpperCase().replace(/\s/g, "");
        const name = document.getElementById("name").value.trim();
        const email = id.trim().toLowerCase() + "@raghuinstech.com";
        const fatherName = document.getElementById("fatherName").value.trim();
        const section = admin.section;

        if (!img || !id || !name || !fatherName) {
            showToastMsg("emptyFields");
            return;
        }

        const formData = new FormData();
        formData.append("img", img);
        formData.append("entity", JSON.stringify({
            "id": id,
            "name": name,
            "email": email,
            "fatherName": fatherName,
            "section": section
        }));

        fetch('http://localhost:8081/admin/students', {
            method: "POST",
            body: formData
        }).then((res) => {
            if (!res.ok)
                throw new Error("serverError");
            return res.json();
        }).then((data) => {
            showToastMsg("add");
            setData(data);
            setShowCard(null);
            localStorage.setItem("students", JSON.stringify(data));
        }).catch((err) => {
            showToastMsg(err.message || "serverError");
        });
    };

    const editStudent = () => {
        const id = selectedRow.id;
        const name = selectedRow.name;
        const email = selectedRow.email;
        const fatherName = selectedRow.fatherName;
        const section = admin.section;

        if (!id || !name || !fatherName) {
            showToastMsg("emptyFields");
            return;
        }

        const formData = new FormData();

        if (img) {
            formData.append("img", img);
        }

        formData.append(
            "entity",
            JSON.stringify({
                "id": id,
                "name": name,
                "email": email,
                "fatherName": fatherName,
                "section": section
            })
        );

        fetch("http://localhost:8081/admin/students", {
            method: "PUT",
            body: formData
        }).then(res => {
            if (!res.ok) throw new Error("serverError");
            return res.json();
        }).then(data => {
            showToastMsg("update");
            setData(data);
            handleCancle();
            localStorage.setItem("students", JSON.stringify(data));
        }).catch(err => {
            showToastMsg(err.message || "serverError");
        });
    };

    const deleteStudent = () => {
        const id = selectedRow.id;

        fetch(`http://localhost:8081/admin/students/${id}`, {
            method: "DELETE"
        }).then((res) => {
            if (!res.ok)
                throw new Error("serverError");
            return res.json();
        }).then((data) => {
            showToastMsg("delete");
            setData(data);
            handleCancle();
            localStorage.setItem("students", JSON.stringify(data));
        }).catch((err) => {
            showToastMsg(err.message || "serverError");
        })
    }


    const [preview, setPreview] = useState(null);
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

    const handleCancle = () => {
        setShowCard(null);
        setSelectedRow(null);
        setPreview(null);
    }

    const handleImg = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setImg(file);
        }
        else {
            setPreview(null);
            setImg(null);
        }
    }

    return (
        <div className="students">
            {(showCard === "addCard") &&
                <div className="stuCard" ref={cardRef}>
                    <div className="cardHeader">
                        <h2>Add New Student</h2>
                    </div>
                    <div className="previewContainer">
                        {(preview) && <img src={preview} alt="preview" className="previewImg" />}
                    </div>
                    <div className="cardForm stu">
                        <table className="cardTable">
                            <tr>
                                <td>Image</td>
                                <td><input type="file" accept="image/*" className="cardLable" id="img" onChange={handleImg} required /></td>
                            </tr>
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

                    <div className="previewContainer">
                        {preview ? (
                            <img src={preview} className="previewImg" alt="preview" />
                        ) : (
                            selectedRow?.imgData && (
                                <img
                                    src={`data:image/jpeg;base64,${selectedRow.imgData}`}
                                    className="previewImg"
                                    alt="existing"
                                />
                            )
                        )}
                    </div>

                    <div className="cardForm">
                        <table className="cardTable">
                            <tr>
                                <td>Image</td>
                                <td><input type="file" accept="image/*" onChange={handleImg} className="cardLable" required /></td>
                            </tr>
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
            <div className={`studentContent ${showCard ? "blur" : ""}`}>
                <div className="pageHeader">
                    <div className="pageTitle">Students Management</div>
                    <button className="addBtn" onClick={addCard}><FaPlus />Add New Student</button>
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
                                {data.map((stu, idx) => (
                                    <tr key={idx}>
                                        <td className="cellBody">{idx + 1}</td>
                                        <td className="cellBody">{stu.id}</td>
                                        <td className="cellBody">{stu.name}</td>
                                        <td className="cellBody">{stu.email}</td>
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
    );
}

export default Students;