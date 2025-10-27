import React from "react";
import { FaPlus } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const Students = () => {
    return (
        <div className="students">
            <div className="pageHeader">
                <div className="pageTitle">Students Management</div>
                <button className="addBtn"><FaPlus />Add New Exam</button>
            </div>
            <div className="studentContainer">
                <div className="tableCard">
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
                        <tr>
                            <td className="cellBody">1</td>
                            <td className="cellBody">233J5A0513</td>
                            <td className="cellBody">Lokesh</td>
                            <td className="cellBody">233j5a0513@raghuinstech.com</td>
                            <td className="cellBody">CSE</td>
                            <td className="cellBody">4</td>
                            <td className="cellBody">2</td>
                            <td className="cellBody"><FaRegEdit className="editIc" /><MdDeleteOutline className="delIc" /></td>
                        </tr>
                        <tr>
                            <td className="cellBody">1</td>
                            <td className="cellBody">233J5A0513</td>
                            <td className="cellBody">Lokesh</td>
                            <td className="cellBody">233j5a0513@raghuinstech.com</td>
                            <td className="cellBody">CSE</td>
                            <td className="cellBody">4</td>
                            <td className="cellBody">2</td>
                            <td className="cellBody"><FaRegEdit className="editIc" /><MdDeleteOutline className="delIc" /></td>
                        </tr>
                        <tr>
                            <td className="cellBody">1</td>
                            <td className="cellBody">233J5A0513</td>
                            <td className="cellBody">Lokesh</td>
                            <td className="cellBody">233j5a0513@raghuinstech.com</td>
                            <td className="cellBody">CSE</td>
                            <td className="cellBody">4</td>
                            <td className="cellBody">2</td>
                            <td className="cellBody"><FaRegEdit className="editIc" /><MdDeleteOutline className="delIc" /></td>
                        </tr>
                        <tr>
                            <td className="cellBody">1</td>
                            <td className="cellBody">233J5A0513</td>
                            <td className="cellBody">Lokesh</td>
                            <td className="cellBody">233j5a0513@raghuinstech.com</td>
                            <td className="cellBody">CSE</td>
                            <td className="cellBody">4</td>
                            <td className="cellBody">2</td>
                            <td className="cellBody"><FaRegEdit className="editIc" /><MdDeleteOutline className="delIc" /></td>
                        </tr>
                        <tr>
                            <td className="cellBody">1</td>
                            <td className="cellBody">233J5A0513</td>
                            <td className="cellBody">Lokesh</td>
                            <td className="cellBody">233j5a0513@raghuinstech.com</td>
                            <td className="cellBody">CSE</td>
                            <td className="cellBody">4</td>
                            <td className="cellBody">2</td>
                            <td className="cellBody"><FaRegEdit className="editIc" /><MdDeleteOutline className="delIc" /></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
}

export default Students;