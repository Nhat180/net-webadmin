import React from "react";
import { Wrapper, LeftNavItem, RightNavItem, RightNav, Content } from "./Navbar.styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
// import { Dropdown, DropdownButton } from "react-bootstrap";
import NetcompanyLogo from "../../logo.png";
import { Avatar, Menu, Dropdown, Button, Space, Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const Navbar = ({ information }) => {
    let item;
    let image;
    if (
        information.role === "admin" ||
        information.role === "user"
    ) {
        image = <Avatar size={34} icon={<UserOutlined />} />;
    } else {
        image = "";
    }

    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
        await logout();
        navigate('/');
        console.log('Logged out')
        } catch (e) {
        console.log(e.message);
        }
    };

    

    if (information.role === "user") {
        item = (
            <>
                <Link to="/menu">
                    <RightNavItem>Menu</RightNavItem>
                </Link>
                <RightNavItem>
                    <div onClick={handleLogout}>Sign Out</div>
                </RightNavItem>
            </>
        );
   
    } else if (information.role === "admin") {
        item = (
            <>
                <Link to="/menu">
                    <RightNavItem>Menu</RightNavItem>
                </Link>
                <Link to="/management">
                    <RightNavItem>Management</RightNavItem>
                </Link>
                <Link to="/survey">
                    <RightNavItem>Survey</RightNavItem>
                </Link>
                <RightNavItem>
                    <div onClick={handleLogout}>Sign Out</div>
                </RightNavItem>
            </>
        );
    } else {
        item = (
            <>
                <Link to="/signin">
                </Link>
            </>
        );
    }

    return (
        <Wrapper>
            <Content>
                <LeftNavItem content="NETCOMPANY" to="/home">
                    <Link to="/home">
                        <img src={NetcompanyLogo}></img>
                    </Link>
                </LeftNavItem>

                <RightNav>{item}</RightNav>
            </Content>
        </Wrapper>
    );
};
export default Navbar;
