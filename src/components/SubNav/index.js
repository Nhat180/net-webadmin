import React from "react";
import { Link } from "react-router-dom";
import { DashBoardContent, DashBoardWrapper } from "./SubNav.style";
const SubNav = ({ content }) => {
    return (
        <div className="a">
            <DashBoardWrapper>
                <DashBoardContent>
                    <h3>{content}</h3>
                    <div>
                        <div>
                            <Link to="/">Home</Link>
                        </div>
                        <span>{content}</span>
                    </div>
                </DashBoardContent>
            </DashBoardWrapper>
        </div>
    );
};

export default SubNav;
