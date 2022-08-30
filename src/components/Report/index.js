 
import React, { useState, useEffect } from "react";
import "./report.css";
import{ db } from "../../firebase";
import { doc, getDocs, collection,  query, where, orderBy, startAt} from "firebase/firestore";
import Sidebar from '../Sidebar.jsx'
import { onSnapshot } from "firebase/firestore";
import "../../Sidebar.css"
import SubNav from '../SubNav'
import Pagination from '../Pagination'
import { Link, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";


export default function Report() {

    const reportCollection = collection(db, 'reports')
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(7);
    const [sort, setSort] = useState(false);
    const sortedStatus = query(collection(db,'reports'), where('status','==', 'process'))
    const orderByStatus = query(collection(db,'reports'), orderBy('status', 'desc'))
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    // the search result
    //  const [results, setResults] = useState(currentItem);    
    

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

    // const filter = (e) => {
    //     const keyword = e.target.value;
    
    //     if (keyword !== '') {
    //       const results = (currentItem).filter((currentItem) => {
    //         return currentItem.data.title.toLowerCase().startsWith(keyword.toLowerCase());
    //         // Use the toLowerCase() method to make it case-insensitive
    //       });
    //       setResults(results);
    //     } else {
    //         setResults(USERS);
    //       // If the text field is empty, show all users
    //     }
    
    //     setName(keyword);
    //   };
    
    const sortDate = async (e) => {
        if (e.target.value =='asc') {
            onSnapshot(query(collection(db,'reports'), orderBy('dateCreate','asc')), snapshot => {
                setReport(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else {
            onSnapshot(query(collection(db,'reports'), orderBy('dateCreate','desc')), snapshot => {
                setReport(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        }
    }

    const sortStatusProcess = async (e) => {
        if (e.target.value == "solved") {
            onSnapshot(query(collection(db,'reports'), orderBy('status'), where('status','==', 'solved')), snapshot => {
                setReport(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else if (e.target.value == "pending") {
            onSnapshot(query(collection(db,'reports'), orderBy('status'), where('status','==', 'pending')), snapshot => {
                setReport(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else {
            onSnapshot(query(collection(db,'reports'), orderBy('status'), where('status','==', 'process')), snapshot => {
                setReport(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        }
    }

    const sortType = async (e) => {
        
        if (e.target.value == "sanitary") {
            onSnapshot(query(collection(db,'reports'), orderBy('type'), where('type','==', 'SANITARY')), snapshot => {
            setReport(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else if (e.target.value == "other") {
            onSnapshot(query(collection(db,'reports'), orderBy('type'), where('type','==', 'Other')), snapshot => {
                setReport(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else if (e.target.value == "device") {
            onSnapshot(query(collection(db,'reports'), orderBy('type'), where('type','==', 'Device')), snapshot => {
                setReport(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else if (e.target.value == "food") {
            onSnapshot(query(collection(db,'reports'), orderBy('type'), where('type','==', 'Food')), snapshot => {
                setReport(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else {
            onSnapshot(query(collection(db,'reports'), orderBy('type'), where('type','==', 'SNACK')), snapshot => {
                setReport(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        }

    }
    
    const searchTitle = async (e) => { onSnapshot(query(collection(db,'reports'), orderBy('title'), startAt(`${e.target.value}`)), snapshot => {
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
            <SubNav content = {"Report"} />
            <h1>Report Management</h1>
            {/* <div class="query">
                <div class="search">
                    <form  style={{ display: "inline" }}>
                        <input
                            type="text"
                            className="inputField"
                            placeholder="  Search All ..."
                            // onChange={searchTitle}
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
            </div> */}
        
        <div className="table-app">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>Date Created
                            <select className="dropdown" name="colValue" onChange={sortDate}>
                                <option value="asc">Asc</option>
                                <option value="desc" >Desc</option >
                            </select>
                        </th>
                        <th style={{textAlign: "center"}}>Title
                            <div class="search">
                                <form  style={{ display: "inline" }}>
                                    <input
                                        type="text"
                                        // className="inputField"
                                        placeholder="Search Title"
                                        onChange={searchTitle}
                                        // value={search}
                                    />
                                </form>
                            </div>
                        </th>
                        <th style={{textAlign: "center"}}>Creator
                            <div class="search">
                                <form  style={{ display: "inline" }}>
                                    <input
                                        type="text"
                                        className="inputField"
                                        placeholder="Search Creator"
                                        // onChange={searchTitle}
                                        value={search}
                                    />
                                </form>
                            </div>
                        </th>

                        <th style={{textAlign: "center"}}>Type
                            <select className="dropdown" name="colValue" onChange={sortType}>
                                <option value="sanitary">Sanitary</option>
                                <option value="snack" >Snack</option >
                                <option value="device">Device</option>
                                <option value="other">Other</option>
                                <option value="food">Food</option>
                            </select>
                        </th>

                        <th style={{textAlign: "center"}}>Status
                            <select className="dropdown" name="colValue" onChange={sortStatusProcess}>
                                <option value="solved">Solved</option>
                                <option value="pending" >Pending </option >
                                <option value="process">Process</option>
                            </select>
                        </th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>   
                </thead>
                <tbody>
                    {currentItem.map((currentItem) =>{
                        return (
                            <tr >
                                <td>{currentItem.data.dateCreate}</td>
                                <td>{currentItem.data.title}</td>
                                <td>{currentItem.data.creator}</td>
                                <td>{currentItem.data.type}</td>
                                <td>{currentItem.data.status}</td>
                                <td>
                                    <Link to={`/view/${currentItem.id}`}>
                                        View
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