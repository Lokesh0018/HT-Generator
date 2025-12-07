import { React, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IoMdDownload } from "react-icons/io";

const HallTicket = () => {

    const Year = 4;
    const Month = "October";
    const YearExam = 2025;
    const Semester = 1;


    const printRef = useRef();

    const downloadPDF = () => {
        const input = printRef.current;

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("HallTicket.pdf");
        });
    };

    return (
        <div className="hallTicket">
            <div className="pageHeader ht">
                <div className="pageTitle">Hall Ticket</div>
            </div>
            <div className="hallTicketContainer" ref={printRef}>
                <div className="ht">
                    <div className="htHeader1">
                        <img
                            src="/img/clgLogo.jpg"
                            alt="College Logo"
                            className="clgLogo"
                        />
                        <div className="htTitle">
                            <h1 className="insName">RAGHU INSTITUTE OF TECHNOLOGY</h1>
                            <h2 className="subHeader">(Autonomous)</h2>
                            <p className="accreditationText">(Approved by AICTE, New Delhi & Permanently Affiliated to JNTUGV, Gurajada)</p>
                            <p className="accreditationText">Accredited by NBA (ECE, EEE, MECH, CSE) & NAAC with 'A' Grade, Listed u/s 2(f) & 12(8) of UGC Act 1956</p>
                            <p className="accreditationText"> Dakamarri, Bheemunipamam Mandal, Visakhapatnam Dist. 531 162 (Α.Ρ.)</p>
                            <p className="accreditationText">Ph: +91-8922-248003, 248013 E-mail: principal@raghuinstech.com website: www.raghuinstech.com</p>
                            <b className="examTitle">B TECH {Year} YEAR {Semester} SEMESTER (AR20) Regular Examinations , {Month} {YearExam} </b>
                        </div>
                    </div>
                    <div className="branchLable">
                        <b>CSE</b>
                        <b><u>HALL TICKET</u></b>
                        <b>ORIGINAL</b>
                    </div>
                    <div className="htLable">
                        <table>
                            <tr>
                                <td>Hall Ticket No: </td>
                                <td>233J5A0513</td>
                            </tr>
                            <tr>
                                <td>Student Name: </td>
                                <td>MUNAKALA LOKESH</td>
                            </tr>
                            <tr>
                                <td>Father Name: </td>
                                <td>MUNAKALA SRINIVASA RAO</td>
                            </tr>
                        </table>
                        <img src="/img/Img2.jpeg" className="htImg" />
                    </div>
                    <div class="htInfo">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Sub Code</th>
                                    <th>Subject Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Sign of the Invigilator</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>20ES3019</td>
                                    <td>Discrete Mathematical Structures</td>
                                    <td>02.01.2024</td>
                                    <td>10:00 AM To 01:00 PM</td>
                                    <td></td>
                                </tr>

                                <tr>
                                    <td>2</td>
                                    <td>20CS2002</td>
                                    <td>Python Programming</td>
                                    <td>04.01.2024</td>
                                    <td>10:00 AM To 01:00 PM</td>
                                    <td></td>
                                </tr>

                                <tr>
                                    <td>3</td>
                                    <td>20CS3002</td>
                                    <td>Computer Organization and Architecture</td>
                                    <td>06.01.2024</td>
                                    <td>10:00 AM To 01:00 PM</td>
                                    <td></td>
                                </tr>

                                <tr>
                                    <td>4</td>
                                    <td>20CS3004</td>
                                    <td>Object Oriented Programming through C++</td>
                                    <td>08.01.2024</td>
                                    <td>10:00 AM To 01:00 PM</td>
                                    <td></td>
                                </tr>

                                <tr>
                                    <td>5</td>
                                    <td>20HS3002</td>
                                    <td>Managerial Economics and Financial Analysis</td>
                                    <td>10.01.2024</td>
                                    <td>10:00 AM To 01:00 PM</td>
                                    <td></td>
                                </tr>

                                <tr>
                                    <td>6</td>
                                    <td>20HS3002</td>
                                    <td>Managerial Economics and Financial Analysis</td>
                                    <td>10.01.2024</td>
                                    <td>10:00 AM To 01:00 PM</td>
                                    <td></td>
                                </tr>

                                <tr>
                                    <td>7</td>
                                    <td>20HS3002</td>
                                    <td>Managerial Economics and Financial Analysis</td>
                                    <td>10.01.2024</td>
                                    <td>10:00 AM To 01:00 PM</td>
                                    <td></td>
                                </tr>

                                <tr>
                                    <td>8</td>
                                    <td>20HS3002</td>
                                    <td>Managerial Economics and Financial Analysis</td>
                                    <td>10.01.2024</td>
                                    <td>10:00 AM To 01:00 PM</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="htFooter">
                        <span>
                            <b>Signature of the Student</b>
                        </span>
                        <span>
                            <img src="/img/COF Sign.png" className="signature"/>
                            <b>Controller of Examinations</b>
                        </span>
                        <span>
                            <img src="/img/Principal Sign.png" className="signature" />
                            <b>Principal</b>
                        </span>
                    </div>
                </div>
            </div>
            <button className="addBtn htdBtn" onClick={downloadPDF}><IoMdDownload />Download</button>
        </div>
    )
}

export default HallTicket;