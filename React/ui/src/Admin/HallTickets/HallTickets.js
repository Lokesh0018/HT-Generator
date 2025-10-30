import React from "react";

const HallTickets = () => {
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
                                <td className="cellHead">Semester</td>
                                <td className="cellHead">Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="cellBody">1</td>
                                <td className="cellBody">Mid Exam</td>
                                <td className="cellBody">
                                    <div class="checkboxWrapper">
                                        <input type="checkbox" className="cbx hide" id="cbx-1" />
                                        <label for="cbx-1" class="toggle"><span></span></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="cellBody">2</td>
                                <td className="cellBody">Final Exam</td>
                                <td className="cellBody">
                                    <div class="checkboxWrapper">
                                        <input type="checkbox" className="cbx hide" id="cbx-2" />
                                        <label for="cbx-2" class="toggle"><span></span></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="cellBody">3</td>
                                <td className="cellBody">Final Exam</td>
                                <td className="cellBody">
                                    <div class="checkboxWrapper">
                                        <input type="checkbox" className="cbx hide" id="cbx-3" />
                                        <label for="cbx-3" class="toggle"><span></span></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="cellBody">4</td>
                                <td className="cellBody">Final Exam</td>
                                <td className="cellBody">
                                    <div class="checkboxWrapper">
                                        <input type="checkbox" className="cbx hide" id="cbx-4" />
                                        <label for="cbx-4" class="toggle"><span></span></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="cellBody">5</td>
                                <td className="cellBody">Final Exam</td>
                                <td className="cellBody">
                                    <div class="checkboxWrapper">
                                        <input type="checkbox" className="cbx hide" id="cbx-5" />
                                        <label for="cbx-5" class="toggle"><span></span></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="cellBody">6</td>
                                <td className="cellBody">Final Exam</td>
                                <td className="cellBody">
                                    <div class="checkboxWrapper">
                                        <input type="checkbox" className="cbx hide" id="cbx-6" />
                                        <label for="cbx-6" class="toggle"><span></span></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="cellBody">7</td>
                                <td className="cellBody">Final Exam</td>
                                <td className="cellBody">
                                    <div class="checkboxWrapper">
                                        <input type="checkbox" className="cbx hide" id="cbx-7" />
                                        <label for="cbx-7" class="toggle"><span></span></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="cellBody">8</td>
                                <td className="cellBody">Final Exam</td>
                                <td className="cellBody">
                                    <div class="checkboxWrapper">
                                        <input type="checkbox" className="cbx hide" id="cbx-8" />
                                        <label for="cbx-8" class="toggle"><span></span></label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default HallTickets;