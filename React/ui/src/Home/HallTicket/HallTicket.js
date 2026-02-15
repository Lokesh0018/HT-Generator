import { React, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IoMdDownload } from "react-icons/io";


const HallTicket = () => {

    const student = JSON.parse(localStorage.getItem("student"));
    const exams = JSON.parse(localStorage.getItem("exams"));
    const Year = exams.year;
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
                        <b>{student.branch}</b>
                        <b><u>HALL TICKET</u></b>
                        <b>ORIGINAL</b>
                    </div>
                    <div className="htLable">
                        <table>
                            <tr>
                                <td>Hall Ticket No: </td>
                                <td>{student.id}</td>
                            </tr>
                            <tr>
                                <td>Student Name: </td>
                                <td>{student.name}</td>
                            </tr>
                            <tr>
                                <td>Father Name: </td>
                                <td>{student.fatherName}</td>
                            </tr>
                        </table>
                        <img src={`data:${student.imgType};base64,${student.imgData}`} className="htImg" alt="" />
                        <img src={`data:png;base64,${student.qrData}`} alt="QR" className="htImg" />
                    </div>
                    <div className="htInfo">
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
                                {
                                    exams && exams.map((exam, idx) => (
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td>{exam.subCode}</td>
                                            <td>{exam.sub}</td>
                                            <td>{exam.date}</td>
                                            <td>{exam.time}</td>
                                            <td></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="htFooter">
                        <span>
                            <b>Signature of the Student</b>
                        </span>
                        <span>
                            <img src="/img/COF Sign.png" className="signature" alt=""/>
                            <b>Controller of Examinations</b>
                        </span>
                        <span>
                            <img src="/img/Principal Sign.png" className="signature" alt=""/>
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