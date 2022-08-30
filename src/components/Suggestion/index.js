 
import React, { useState, useEffect } from "react";
import "./suggestion.css";
import{ db } from "../../firebase";
import { doc, getDocs, collection,  query, where, orderBy} from "firebase/firestore";
import Sidebar from '../Sidebar.jsx'
import { onSnapshot } from "firebase/firestore";
import "../../Sidebar.css"
import SubNav from '../SubNav'
import Pagination from '../Pagination'
import { Link, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";


export default function Suggestion() {

    const reportCollection = collection(db, 'suggestions')
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(7);
    const [sort, setSort] = useState(false);
    const sortedStatus = query(collection(db,'suggestions'), where('status','==', 'process'))
    const orderByStatus = query(collection(db,'suggestions'), orderBy('status', 'desc'))
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchReport = onSnapshot(reportCollection, snapshot => {
            setReport(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        } )
        return () => {
            fetchReport()
        }
    }, []);

    // const sortStatusProcess = async (e) => {
    //     const data = await getDocs(query(reportCollection, orderBy('status', `${e.target.value}`)));
    //     const newData = data.docs.map((doc) => ({
    //         ...doc.data(),
    //         id: doc.id,
    //     }));
        
    //     setReport(newData);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate.push(`/search?name=${search}`);
        setSearch("");
      };

    const sortStatusProcess = async (e) => { onSnapshot(query(collection(db,'suggestions'), orderBy('status', `${e.target.value}`)), snapshot => {
        setReport(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})}

    // Get current 
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItem = report.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
        <Sidebar>
        
        <div class="report">
            <SubNav content = {"Suggestion"} />
            <h1>Suggestion Management</h1>
            <div class="query">
                <div class="search">
                    <form onSubmit={handleSubmit} style={{ display: "inline" }}>
                        <input
                            type="text"
                            className="inputField"
                            placeholder="Search Title ..."
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                    </form>
                </div>
                <div class="sort">
                    <label>Sort By: </label>
                    <select className="dropdown" name="colValue" onChange={sortStatusProcess}>
                        <option value="asc">Please Select</option>
                        <option value="asc" >Pending Status </option >
                        <option value="desc">Process Status</option>
                        
                    </select>
                </div> 
            </div>
        
        <div className="table-app">
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
                    {currentItem.map((currentItem) =>{
                        return (
                            <tr >
                                <td >
                                    <Link to={`/suggest/${currentItem.id}`}>
                                        {currentItem.data.dateCreate}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/suggest/${currentItem.id}`}>
                                        {currentItem.data.title}
                                    </Link>
                                </td>
                                <td >
                                    <Link to={`/suggest/${currentItem.id}`}>
                                        {currentItem.data.creator}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/suggest/${currentItem.id}`}>
                                        
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/suggest/${currentItem.id}`}>
                                        {currentItem.data.status}
                                    </Link>
                                </td>
                            </tr>
                            
                        )
                    })}
                </tbody>
            </table>
            <div class ="pag">
                <Pagination
                    itemPerPage={itemPerPage}
                    totalItem={report.length}
                    paginate={paginate}
                />
            </div>
        </div>
        </div>
        </Sidebar>
        </> 
    );

}