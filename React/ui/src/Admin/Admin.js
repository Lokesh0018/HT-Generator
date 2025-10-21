import {React,useState} from "react";
import { NavLink } from "react-router-dom";
import { TbSquareRoundedLetterAFilled } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import Navigation from "./Navigation/Navigation";

const Admin = () => {
    const [pressed, setPressed] = useState(false);
    const select = () => {
        setPressed(true);
    };
    const receive = () => {
        setPressed(false);
    };
    return (
        <div className="admin">
            <aside className="adminSideBar">
                <Navigation settings={pressed} sendDataToParent={receive}/>
            </aside>
            <div className="adminHeader">
                <div className="profileLogo">
                    <CgProfile onClick={select}/>
                </div>
            </div>
        </div>
    );
}

export default Admin;