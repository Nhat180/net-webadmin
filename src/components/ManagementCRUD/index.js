import React from "react";
import { Table, Button, Modal, Col, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./ManagementCRUD.css";
import { Item, LeftContent, RightContent, Wrapper, Text, ReportForm } from "./ManagementCRUD.style";
import styled from "styled-components";
import Pending from "../pending.png";
import BlackPending from "../black-pending.png";
import Checked from "../checked.png";


const ManagementCRUD = ({
    // users,
    reports,
    suggestion,
    deleteUser,
    editRow,
    currentUser,
    updatedUser,
    theme,
    currentPage,
    pageSize,
    container,
    menuName,
    setMenuName,
    addUser,
}) => {
    // const { items, deleteItem, editRow, currentItem, updateItem, theme, currentPage, pageSize } =
    //     props;
    // const [item, setItem] = React.useState();
    const [deleteId, setDeleteId] = useState();
    const [editItem, setEditItem] = useState();
    const [deleteModalShow, setdeleteModalShow] = useState(false);
    



    const [ItemModalShow, setItemModalShow] = useState(false);
    const [itemShow, setItemShow] = useState({});
    const handleDeleteUser = () => {
        setdeleteModalShow(false);
        deleteUser(deleteId);
    };
    let tableHead;


    let tableBody;
    //   if (menuName === "user") {
    //     tableHead = (
    //         <>
    //             <th>Username</th>
    //             <th>Role</th>
    //             <th></th>
    //             <th>Action</th>
    //         </>
    //     );
    //     tableBody = (
    //         <>
    //             {users.map((user, index) => (
    //                 <tr key={index}>
    //                     <td
    //                         style={{ width: "15%" }}
    //                         onClick={() => {
    //                             // setItemModalShow(true);
    //                             // setItemShow(user);
    //                             editRow(user);
    //                         }}
    //                     >
    //                         <>{user.username}</>
    //                     </td>
    //                     <td
    //                         style={{ width: "15%" }}
    //                         onClick={() => {
    //                             // setItemModalShow(true);
    //                             // setItemShow(user);
    //                             editRow(user);
    //                         }}
    //                     >
    //                         <>{user.role}</>
    //                     </td>
    //                     <td>
    //                         {/* <ProgressStatus theme={theme} progress={progress}></ProgressStatus> */}
    //                         <div className="btn-container btn">
    //                             <div
    //                                 className="btn-delete center"
    //                                 onClick={() => {
                                        
    //                                 }}
    //                                 style={{ color: theme === "light" ? "black" : "white" }}
    //                             >
    //                                 Promote
    //                             </div>
    //                         </div>
    //                     </td>
    //                     <td>
    //                         {/* <ProgressStatus theme={theme} progress={progress}></ProgressStatus> */}
    //                         <div className="btn-container btn">
    //                             <div
    //                                 className="btn-delete center"
    //                                 onClick={() => {
    //                                     setdeleteModalShow(true);
    //                                     setDeleteId(user.id);
    //                                 }}
    //                                 style={{ color: theme === "light" ? "black" : "white" }}
    //                             >
    //                                 Delete
    //                             </div>
    //                         </div>
    //                     </td>

    //                 </tr>
    //             ))}
    //         </>
    //     );
    // } 
    // else 
    if (menuName === "report") {
        tableHead = (
            <>
                <th>Title</th>
                <th>Creator</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>View</th>
            </>
        );
        tableBody = (
            <>
                {reports.map((report) => (
                    <tr key={report}>
                        <td
                            style={{ width: "15%" }}
                            onClick={() => {
                                // setItemModalShow(true);
                                // setItemShow(user);
                                editRow(report);
                            }}
                        >
                            <>{report.data.title}</>
                        </td>
                        <td
                            style={{ width: "10%" }}
                            onClick={() => {
                                // setItemModalShow(true);
                                // setItemShow(user);
                                editRow(report);
                            }}
                        >
                            <>{report.data.creator}</>
                        </td>
                        <td
                            style={{ width: "10%" }}
                            onClick={() => {
                                // setItemModalShow(true);
                                // setItemShow(user);
                                editRow(report);
                            }}
                        >
                            <>{report.data.type}</>
                        </td>
                        <td
                            style={{ width: "10%" }}
                            onClick={() => {
                                // setItemModalShow(true);
                                // setItemShow(user);
                                editRow(report);
                            }}
                        >
                            <>{report.data.dateCreate}</>
                        </td>
                        <td
                            style={{ width: "20%" }}
                            onClick={() => {
                                // setItemModalShow(true);
                                // setItemShow(user);
                                editRow(report);
                            }}
                        >
                            <>{report.data.status}</>
                        </td>
                        <td>
                            {/* <ProgressStatus theme={theme} progress={progress}></ProgressStatus> */}
                            <div className="btn-container btn">
                                <div
                                    className="btn-delete center"
                                    onClick={() => {
                                       
                                    }}
                                    style={{ color: theme === "light" ? "black" : "white" }}
                                >
                                    View
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </>
        );
    }
    else {
        tableHead = (
            <>
                <th>Title</th>
                <th>Creator</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>View</th>
            </>
        );
        tableBody = (
            <>
                {suggestion.map((suggestion) => (
                    <tr key={suggestion}>
                        <td
                            style={{ width: "15%" }}
                            onClick={() => {
                                // setItemModalShow(true);
                                // setItemShow(user);
                                editRow(suggestion);
                            }}
                        >
                            <>{suggestion.data.title}</>
                        </td>
                        <td
                            style={{ width: "10%" }}
                            onClick={() => {
                                // setItemModalShow(true);
                                // setItemShow(user);
                                editRow(suggestion);
                            }}
                        >
                            <>{suggestion.data.creator}</>
                        </td>
                        <td
                            style={{ width: "10%" }}
                            onClick={() => {
                                // setItemModalShow(true);
                                // setItemShow(user);
                                editRow(suggestion);
                            }}
                        >
                            <>{suggestion.data.dateCreate}</>
                        </td>
                        <td
                            style={{ width: "20%" }}
                            onClick={() => {
                                // setItemModalShow(true);
                                // setItemShow(user);
                                editRow(suggestion);
                            }}
                        >
                            <>{suggestion.data.status}</>
                        </td>
                        <td>
                            {/* <ProgressStatus theme={theme} progress={progress}></ProgressStatus> */}
                            <div className="btn-container btn">
                                <div
                                    className="btn-delete center"
                                    onClick={() => {
                                       
                                    }}
                                    style={{ color: theme === "light" ? "black" : "white" }}
                                >
                                    View
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </>
        );
    }
    return (
        <Table
            hover
            style={{ color: theme === "light" ? "black" : "white" }}
            variant={theme === "light" ? "black" : "dark"}
            className="ManagementCrud"
        >
            <thead>
                <tr>{tableHead}</tr>
            </thead>
            <tbody>
                {tableBody}
                <DeleteConfirmModal
                    show={deleteModalShow}
                    onHide={() => setdeleteModalShow(false)}
                    handleDeleteUser={handleDeleteUser}
                />
                {/* <ItemDetailModalStyled
                    show={ItemModalShow}
                    onHide={() => setItemModalShow(false)}
                    currentUser={currentUser}
                    updatedUser={updatedUser}
                    theme={theme}
                    // setProgress={setProgress}
                /> */}
            </tbody>
        </Table>
    );
};

function DeleteConfirmModal(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Are you sure to delete this item?
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button onClick={props.handleDeleteUser}>Yes</Button>
                <Button onClick={props.onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}

// function ItemDetailModal(props) {
//     const handleUpdate = () => {
//         props.onHide();
//         props.updatedUser(props.currentUser.id, { ...props.currentUser, progress: true });
//     };
//     return (
//         <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
//             <ReportForm
//                 className="report-form"
//                 backgroundColor={props.theme == "light" ? "white" : "#001529"}
//                 textColor={props.theme == "light" ? " #4014ba" : "#a387f1"}
//                 titleColor={props.theme == "light" ? " blackk" : "#f33d3d"}
//                 selectBackground={props.theme == "light" ? " white" : "#001529"}
//                 style={{ borderRadius: "20px" }}
//             >
//                 <div className="header">
//                     <img src={Avatar} className="user-img" />
//                     <h4>Mr. Tran Vu Hoang Viet</h4>
//                     <h6>Software engineering</h6>
//                 </div>
//                 <div className="body">
//                     <div className="title">
//                         <div>User Report</div>
//                     </div>
//                     <div className="content">
//                         <div className="contentTitle">Name</div>
//                         <div className="detail">Viet</div>
//                     </div>
//                     <div className="content">
//                         <div className="contentTitle">Address</div>
//                         <div className="detail">299 Hung Vuong</div>
//                     </div>
//                     <div className="content">
//                         <div className="contentTitle">Phone</div>
//                         <div className="detail">0988715774</div>
//                     </div>
//                     <div className="content">
//                         <div className="contentTitle">Report content</div>
//                         <div className="detail">dsJHjsandkjasdjhasodjaskdjsajdsajdjfhiaohfoh</div>
//                     </div>
//                     <div className="content">
//                         {" "}
//                         <select name="userType" id="userType">
//                             <option value="" disabled selected>
//                                 Categorical
//                             </option>
//                             <option value="Shop/Mechanic">Shop/Mechanic</option>
//                             <option value="User">User</option>
//                         </select>
//                     </div>
//                     <div className="content">
//                         <select name="userType" id="userType">
//                             <option value="" disabled selected>
//                                 Assign Mechanic
//                             </option>
//                             <option value="Shop/Mechanic">Shop/Mechanic</option>
//                             <option value="User">User</option>
//                         </select>
//                     </div>
//                     <div className="confirm-button">
//                         <button class="btn2 draw-border" onClick={handleUpdate}>
//                             {" "}
//                             Confirm
//                         </button>
//                     </div>
//                 </div>
//             </ReportForm>
//         </Modal>
//     );
// }

// const ItemDetailModalStyled = styled(ItemDetailModal)`
//     .modal-content {
//         border-radius: 24px;
//     }
// `;
export default ManagementCRUD;
