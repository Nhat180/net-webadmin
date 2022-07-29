import React from "react";
import ReactDOM from "react-dom";
import { Menu, Switch, Divider } from "antd";
import RocketLogo from "../../rocket.png";
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LinkOutlined,
    FileTextOutlined,
    SolutionOutlined,
    ShopOutlined,
} from "@ant-design/icons";
import { Logo, Head } from "./Navbar.style";
import "./custom.css";
import { useNavigate } from "react-router-dom";

const { SubMenu } = Menu;

export const Navbar = ({
    changeTheme,
    theme,
    menuName,
    setMenuName,
    setFilters,
    filters,
    setSearchValue,
    setIsLoading,
}) => {
    const [mode, setMode] = React.useState("inline");
    let navigate = useNavigate();
    

    const [logo, setLogo] = React.useState(1);
    return (
        <>
            <Head
                background={theme === "light" ? "white" : "#001529"}
                textColor={theme === "light" ? "#001529" : "white"}
                switchColor={theme === "light" ? "white" : "#001529"}
            >
                <Logo>
                    {logo == 1 ? (
                        <FileTextOutlined />
                    ) : logo == 2 ? (
                        <SolutionOutlined />
                    ) : logo == 3 ? (
                        <SolutionOutlined />
                    ) : (
                        <FileTextOutlined />
                    )}

                    <span>
                        {" "}
                        {menuName == "report"
                            ? "Manage Report"
                            : menuName == "suggestion"
                            ? "Manage Suggestions"
                            // : menuName == "service"
                            // ? "Services"
                            : "Manage Report"
                            }
                    </span>
                </Logo>

                <Switch onChange={changeTheme} />
            </Head>
            

            <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={
                    menuName === "report"
                        ? ["1"]
                        : menuName === "suggestion"
                        ? ["2"]
                        // : menuName === "mechanic"
                        // ? ["3"]
                        // : menuName === "service"
                        // ? ["4"]
                        : ["1"]
                }
                defaultOpenKeys={["sub1"]}
                mode={mode}
                theme={theme}
            >
                <Menu.Item
                    onClick={() => {
                        setLogo(1);
                        setMenuName("report");
                        setFilters({ ...filters, currentPage: 1, sort: "", search: "" });
                        navigate(`/management?role=report`);
                        setSearchValue("");
                        setIsLoading(true);
                    }}
                    key="1"
                    icon={<FileTextOutlined />}
                >
                    Manage Reports
                </Menu.Item>
                <Menu.Item
                    onClick={() => {
                        setLogo(2);
                        setMenuName("suggestion");
                        navigate(`/management?role=suggestion`);
                        setFilters({ ...filters, currentPage: 1, sort: "", search: "" });
                        setSearchValue("");
                        setIsLoading(true);
                    }}
                    key="2"
                    icon={<SolutionOutlined />}
                >
                    Manage Suggestions
                </Menu.Item>
                {/* <Menu.Item
                    onClick={() => {
                        setLogo(3);
                        setMenuName("mechanic");
                        navigate(`/management?role=mechanic`);
                        setFilters({ ...filters, currentPage: 1, sort: "", search: "" });
                        setSearchValue("");
                        setIsLoading(true);
                    }}
                    key="3"
                    icon={<SolutionOutlined />}
                >
                    Manage Mechanics
                </Menu.Item> */}
                
            </Menu>
        </>
    );
};
