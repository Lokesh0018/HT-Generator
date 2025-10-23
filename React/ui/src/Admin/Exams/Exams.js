import React from "react";
import { FaPlus } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { FaCirclePlus } from 'react-icons/fa6';

const Exams = () => {
    return (
        <div className="exams">
            <div className="pageHeader">
                <div className="pageTitle">Exams Management</div>
                <button className="addExamBtn"><FaPlus />Add New Exam</button>
            </div>
            <div className="examSelector">
                <div className="examCard">
                    <select className="semSelect">
                        <option value="midterm">Midterm Exam - March 2024</option>
                        <option value="final">Final Exam - June 2024</option>
                    </select>
                    <select className="examSelect hide">
                        <option value="math101">Math 101</option>
                        <option value="phy101">Physics 101</option>
                    </select>
                </div>
            </div>
            <div className="examContainer">
                <div className="examHeader">
                    <div className="examTitle">
                        Time Table
                    </div>
                    <button className="addSubBtn"><FaCirclePlus />Add Subject</button>
                </div>
                <div className="examCard">
                    <table className="examTable">
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
                            <tr>
                                <td className="cellBody">1</td>
                                <td className="cellBody">20CS501</td>
                                <td className="cellBody">Data Structures</td>
                                <td className="cellBody">2024-03-15</td>
                                <td className="cellBody">10:00 AM - 12:00 PM</td>
                                <td className="cellBody"><FaRegEdit className="editIc" /><MdDeleteOutline className="delIc" /></td>
                            </tr>
                            <tr>
                                <td className="cellBody">2</td>
                                <td className="cellBody">20CS502</td>
                                <td className="cellBody">Algorithms</td>
                                <td className="cellBody">2024-03-17</td>
                                <td className="cellBody">2:00 PM - 4:00 PM</td>
                                <td className="cellBody"><FaRegEdit className="editIc" /><MdDeleteOutline className="delIc" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Exams;