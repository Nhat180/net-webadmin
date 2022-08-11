import React, { useState, useEffect } from "react";
import "./survey.css";
import{ db } from "../../firebase";
import { doc, getDoc, collection, setDoc} from "firebase/firestore";
import Sidebar from '../Sidebar.jsx'
import { onSnapshot } from "firebase/firestore";
import "../../Sidebar.css"
import axios from 'axios';
import Pagination from '../Pagination'

export default function User() {

    const surveyCollection = collection(db, 'surveys')
    const [survey, setSurvey] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(10);

    useEffect(() => {
        const fetchSurvey = onSnapshot(surveyCollection, snapshot => {
            setSurvey(snapshot.docs.map(doc => ({data: doc.data()})))
        } )
        return () => {
            fetchSurvey()
        }
    }, []);

    // Get current 
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItem = survey.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
        <Sidebar>
        <div class="sub-nav">
            <h2>Survey</h2>
        </div>
        <h1>Survey Management</h1> 
        <div className="App">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>Date Created</th>
                        <th style={{textAlign: "center"}}>Title</th>
                        <th style={{textAlign: "center"}}>Creator</th>
                        <th style={{textAlign: "center"}}>Close time</th>
                        <th style={{textAlign: "center"}}>Status</th>
                    </tr>   
                </thead>
                <tbody>
                    {currentItem.map((id) =>{
                        return (
                            <tr >
                                {/* <th scope="row">{index +1}</th> */}
                                <td>{id.data.created.toDate().toDateString()}</td>
                                <td>{id.data.title}</td>
                                <td>{id.data.createdBy}</td>
                                <td>{id.data.close.toDate().toDateString()}</td>
                                <td></td>   
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Pagination
                itemPerPage={itemPerPage}
                totalItem={survey.length}
                paginate={paginate}
            />
        </div>
        </Sidebar>
        </> 
    );

}