import { React, useState } from "react";
import { FaEye } from 'react-icons/fa';
import { LiaWpforms } from 'react-icons/lia';

const HallTickets = () => {
    const initialData = [
        {
            "S.no": 1,
            "Id": "233J5A0513",
            "Name": "Munakala Lokesh",
            "Branch": "CSE",
            "Year": 4,
            "Semester": 1,
            "Regulation": "AR20",
            "Status": true
        },
        {
            "S.no": 2,
            "Id": "233J5A0514",
            "Name": "Munakala Lokesh",
            "Branch": "CSE",
            "Year": 4,
            "Semester": 1,
            "Regulation": "AR20",
            "Status": false
        }
    ];

    const [students, setStudents] = useState(initialData);
    const [viewCard, setViewCard] = useState();

    const approveAll = () => {
        setStudents(prev => {
            return prev.map(stu => {
                return { ...stu, Status: true }
            })
        })
    }

    const updateAction = (id, newStatus) => {
        setStudents(prev =>
            prev.map(stu =>
                stu.Id === id ? { ...stu, Status: newStatus } : stu
            )
        );
    };

    const handleViewCard = (id) => {
        const student = initialData.find(s => s.Id == id);
        setViewCard(student);
        console.log(viewCard);
    }

    return (
        <div className="hallTickets">
            {(viewCard) && (
                <div className="stuDetailsHomeContainer sdh">
                    <div className="stuDetailsHomeHeader">
                        <LiaWpforms className="detailsCardIc" /> <h1>Details</h1>
                    </div>
                    <hr />
                    <div className="stuDetailsHomeBody">
                        <div className="stuDetailsImgHome"><img /></div>
                        <table>
                            <tr>
                                <td>Name :</td>
                                <td>Munakala Lokesh</td>
                            </tr>
                            <tr>
                                <td>Id :</td>
                                <td>233J5A0513</td>
                            </tr>
                            <tr>
                                <td>Branch :</td>
                                <td>Computer Science and Engineering</td>
                            </tr>
                            <tr>
                                <td>Year :</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>Semester :</td>
                                <td>2</td>
                            </tr>
                        </table>
                    </div>
                </div>
            )}
            <div className="pageHeader">
                <div className="pageTitle">HallTickets Management</div>
                <button className="addBtn" onClick={approveAll}>Approve All</button>
            </div>

            <div className="hallTicketContainer">
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
                            {students.map((stu, index) => (
                                <tr key={index}>
                                    <td className="cellBody">{stu["S.no"]}</td>
                                    <td className="cellBody">{stu["Id"]}</td>
                                    <td className="cellBody">{stu["Name"]}</td>
                                    <td className="cellBody">{stu["Regulation"]}</td>
                                    <td className="cellBody"><FaEye className="viewIc" onClick={() => handleViewCard(stu.Id)} /></td>

                                    <td className="cellBody">
                                        <input
                                            type="checkbox"
                                            checked={stu.Status}
                                            onChange={(e) =>
                                                updateAction(stu.Id, e.target.checked)
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
    );
};

export default HallTickets;
