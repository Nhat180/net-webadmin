import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Wrapper } from "./Filter.style";
const Filter = (props) => {
    const { SubMenu } = Menu;
    const {
        handleSortID,
        handleSortName,
        handleSortAddress,
        handleSortEmail,
        theme,
        deleteFilter,
        filters,
        setSearchValue,
        menuName,
    } = props;
    let temp = Object.values(filters);
    let temp2 = [];
    for (let i = 0; i < temp.length; i++) {
        if (i !== 0 && temp[i] !== "" && temp[i] !== null) {
            temp2.push(temp[i]);
        }
    }
    let notFilter = true;
    if (temp2.length < 1) {
        notFilter = false;
    }
    const sortMenu =
        menuName == "service" ? (
            <>
                <Menu>
                    <SubMenu title="Name" key="name">
                        <Menu.Item
                            key="22"
                            onClick={(e) => {
                                handleSortName(e.key);
                            }}
                        >
                            Asc
                        </Menu.Item>
                        <Menu.Item
                            key="23"
                            onClick={(e) => {
                                handleSortName(e.key);
                            }}
                        >
                            Des
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </>
        ) : (
            <Menu>
                <SubMenu title="ID" key="id">
                    <Menu.Item
                        key="20"
                        onClick={(e) => {
                            handleSortID(e.key);
                        }}
                    >
                        Asc
                    </Menu.Item>
                    <Menu.Item
                        key="21"
                        onClick={(e) => {
                            handleSortID(e.key);
                        }}
                    >
                        Des
                    </Menu.Item>
                </SubMenu>
                {menuName == "serviceTran" ? (
                    ""
                ) : (
                    <>
                        <SubMenu title="Name" key="name">
                            <Menu.Item
                                key="22"
                                onClick={(e) => {
                                    handleSortName(e.key);
                                }}
                            >
                                Asc
                            </Menu.Item>
                            <Menu.Item
                                key="23"
                                onClick={(e) => {
                                    handleSortName(e.key);
                                }}
                            >
                                Des
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu title="Address" key="address">
                            <Menu.Item
                                key="24"
                                onClick={(e) => {
                                    handleSortAddress(e.key);
                                }}
                            >
                                Asc
                            </Menu.Item>
                            <Menu.Item
                                key="25"
                                onClick={(e) => {
                                    handleSortAddress(e.key);
                                }}
                            >
                                Des
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu title="Email" key="email">
                            <Menu.Item
                                key="26"
                                onClick={(e) => {
                                    handleSortEmail(e.key);
                                }}
                            >
                                Asc
                            </Menu.Item>
                            <Menu.Item
                                key="27"
                                onClick={(e) => {
                                    handleSortEmail(e.key);
                                }}
                            >
                                Des
                            </Menu.Item>
                        </SubMenu>
                    </>
                )}
            </Menu>
        );
    return (
        <>
            <Wrapper
                style={{
                    justifyContent: "right",
                    padding: "20px 0px 0px 0px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                }}
            >
                {notFilter === true ? (
                    <Button
                        danger
                        type="text"
                        onClick={() => {
                            deleteFilter();
                            setSearchValue("");
                        }}
                    >
                        Remove filter
                    </Button>
                ) : (
                    <></>
                )}

                <Dropdown overlay={sortMenu}>
                    <div
                        style={{
                            color: theme === "light" ? "blue" : "#9e81f5",
                            cursor: "pointer",
                            fontWeight: theme === "light" ? "normal" : "bolder",
                        }}
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                    >
                        Sort by <DownOutlined />
                    </div>
                </Dropdown>
                {/* <Dropdown overlay={filter}>
                    <div
                        style={{
                            color: theme === "light" ? "blue" : "#9e81f5",
                            cursor: "pointer",
                            fontWeight: theme === "light" ? "normal" : "bolder",
                        }}
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                    >
                        Filter <DownOutlined />
                    </div>
                </Dropdown> */}
            </Wrapper>

            <Wrapper
                style={{
                    padding: "0px 0px 10px 0px",
                    display: "flex",
                    justifyContent: "right",
                    gap: "5px",
                }}
            >
                {temp2.map((value, i) => (
                    <>
                        <Button type="primary">{value}</Button>
                    </>
                ))}
            </Wrapper>
        </>
    );
};

export default Filter;
