import React from "react";

export const EditTimeTable = ({ selectedRow }) => {
    return (
        <div className="editTimeTable">
            <h3>Edit Time Table Entry</h3>
            <div className="formGroup">
                <label>S.no:</label>
                <input type="text" value={selectedRow["S.no"]} readOnly />
            </div>
            <div className="formGroup">
                <label>Sub Code:</label>
                <input type="text" value={selectedRow["Sub Code"]} />
            </div>
            <div className="formGroup">
                <label>Subject:</label>
                <input type="text" value={selectedRow["Subject"]} />
            </div>
            <div className="formGroup">
                <label>Date:</label>
                <input type="date" value={selectedRow["Date"]} />
            </div>
            <div className="formGroup">
                <label>Time:</label>
                <input type="time" value={selectedRow["Time"]} />
            </div>
            <button className="saveBtn">Save Changes</button>
        </div>
    );
}