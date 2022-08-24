import React from "react";
import { Wrapper, LeftNavItem, RightNavItem, RightNav, Content } from "./Navbar.styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
// import { Dropdown, DropdownButton } from "react-bootstrap";
// import NetcompanyLogo from "../../logo.png";
import NetcompanyLogo from "../../net.jpg";
import { Avatar, Menu, Dropdown, Button, Space, Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const Navbar = () => {
    
    return (
        <Wrapper>
            <Content>
                <LeftNavItem content="Netcompany" to="/">
                    
                        <img src={NetcompanyLogo}
                        style={{
                            width: 90,
                            height: 60,
                            borderRadius: '40%',
                          }}>
                        </img>
                </LeftNavItem>

            </Content>
        </Wrapper>
    );
};
export default Navbar;
