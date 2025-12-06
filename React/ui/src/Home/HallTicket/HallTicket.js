import React from "react";

const HallTicket = () => {
    return (
        <div className="hallTicket">
            <div className="pageHeader ht">
                <div className="pageTitle">Hall Ticket</div>
            </div>
            <div className="hallTicketContainer">
                <div className="ht">
                    <div className="htHeader">
                        <img
                            src="/img/clgLogo.jpg"
                            alt="College Logo"
                            className="clgLogo"
                        />
                        <div className="htTitle">
                        <h1 className="headerTxt1">RAGHU INSTITUTE OF TECHNOLOGY</h1>
                        <h2 className="headerTxt2">(Autonomous)</h2>
                        <p>(Approved by AICTE, New Delhi & Permanently Affiliated to JNTUK, JNTUK, Kakinada)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HallTicket;