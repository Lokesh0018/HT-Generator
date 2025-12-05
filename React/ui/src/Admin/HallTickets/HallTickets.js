import React from "react";
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const HallTickets = () => {
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
    return (
        <div className="hallTickets">
            <div className="pageHeader">
                <div className="pageTitle">HallTickets Management</div>
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
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((stu) => (
                                <tr key={stu.key}>
                                    <td className="cellBody">{stu["S.no"]}</td>
                                    <td className="cellBody">{stu["Id"]}</td>
                                    <td className="cellBody">{stu["Name"]}</td>
                                    <td className="cellBody">{stu["Branch"]}</td>
                                    <td className="cellBody">{stu["Year"]}</td>
                                    <td className="cellBody">{stu["Semester"]}</td>
                                    <td className="cellBody">
                                        <FaRegEdit className="editIc"  />
                                        <MdDeleteOutline className="delIc" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default HallTickets;