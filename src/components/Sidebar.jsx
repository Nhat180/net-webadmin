import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaRegCommentDots
}from "react-icons/fa";
import {FcSurvey} from "react-icons/fc"
import { TbMessageReport, TbLogout} from "react-icons/tb"
import { BiUserCircle} from "react-icons/bi"
import { NavLink } from 'react-router-dom';
import NetcompanyLogo from "../net.jpg";
import { UserAuth } from '../context/AuthContext';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const {logout} = UserAuth();
    const menuItem=[
        {
            path:"/menu",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/user",
            name:"User",
            icon:<BiUserCircle/>
        },
        {
            path:"/report",
            name:"Report",
            icon:<TbMessageReport/>
        },
        {
            path:"/suggestion",
            name:"Suggestion",
            icon:<FaRegCommentDots/>
        },
        {
            path:"/survey",
            name:"Survey",
            icon:<FcSurvey/>
        },    
    ]



    return (
        <div className="sidebar-container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                    <img src={NetcompanyLogo}
                        className="logo"
                        style={{
                            width: 60,
                            height: 50,
                            borderRadius: '30%',
                            display: isOpen ? "block" : "none"
                    }}></img>
                   {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1> */}
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
               <div className="link"  onClick={logout}>
                    <div className="icon"><TbLogout /></div>
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text">Log out</div>
               </div>
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;