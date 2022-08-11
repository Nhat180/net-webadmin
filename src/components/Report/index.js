import React, { useState, useEffect } from "react";
import "./report.css";
import{ db } from "../../firebase";
import { doc, getDoc, collection, setDoc} from "firebase/firestore";
import Sidebar from '../Sidebar.jsx'
import { onSnapshot } from "firebase/firestore";
import "../../Sidebar.css"
import axios from 'axios';
import Pagination from '../Pagination'

export default function User() {

    const reportCollection = collection(db, 'reports')
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(10);

    useEffect(() => {
        const fetchReport = onSnapshot(reportCollection, snapshot => {
            setReport(snapshot.docs.map(doc => ({data: doc.data()})))
        } )
        return () => {
            fetchReport()
        }
    }, []);

    // Get current 
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItem = report.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
        <Sidebar>
        <div class="sub-nav">
            <h2>Report</h2>
        </div>
        <h1>Report Management</h1> 
        <div className="App">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>Date Created</th>
                        <th style={{textAlign: "center"}}>Title</th>
                        <th style={{textAlign: "center"}}>Creator</th>
                        <th style={{textAlign: "center"}}>Type</th>
                        <th style={{textAlign: "center"}}>Status</th>
                    </tr>   
                </thead>
                <tbody>
                    {currentItem.map((id) =>{
                        return (
                            <tr >
                                {/* <th scope="row">{index +1}</th> */}
                                <td>{id.data.dateCreate}</td>
                                <td>{id.data.title}</td>
                                <td>{id.data.creator}</td>
                                <td>{id.data.type}</td>
                                <td>{id.data.status}</td>   
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Pagination
                itemPerPage={itemPerPage}
                totalItem={report.length}
                paginate={paginate}
            />
        </div>
        </Sidebar>
        </> 
    );

}