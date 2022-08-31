 
import React, { useState, useEffect } from "react";
import "./report.css";
import{ db } from "../../firebase";
import { doc, getDocs, collection,  query, where, orderBy, startAt} from "firebase/firestore";
import Sidebar from '../Sidebar.jsx'
import { onSnapshot } from "firebase/firestore";
// import "../../Sidebar.css"
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
        if (e.target.value == "done") {
            onSnapshot(query(collection(db,'reports'), orderBy('status'), where('status','==', 'done')), snapshot => {
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

    const globalSearch = async (e) => {
        if(e.target.value === null) {
            onSnapshot(reportCollection, snapshot => {
                setReport(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            } )
        } else {

                setReport(report.filter(
                    (report) => 
                    report.data.creator.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    report.data.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    report.data.type.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    report.data.dateCreate.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    report.data.status.toLowerCase().includes(e.target.value.toLowerCase()) 
                ));
        }        
    }
    
    const searchTitle = async (e) => {
        if(e.target.value === null) {
            onSnapshot(reportCollection, snapshot => {
                setReport(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            } )
        } else {

                setReport(report.filter(
                    (report) => 
                    report.data.title.toLowerCase().includes(e.target.value.toLowerCase())
                ));
        }        
    }

    const searchCreator = async (e) => {
        if(e.target.value === null) {
            onSnapshot(reportCollection, snapshot => {
                setReport(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            } )
        } else {

                setReport(report.filter(
                    (report) => 
                    report.data.creator.toLowerCase().includes(e.target.value.toLowerCase())
                ));
        }        
    }

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
                <div className="global-search">
                    <form  style={{ display: "inline" }}>
                        <input
                            type="text"
                            placeholder="  Search All ..."
                            onChange={globalSearch}
                        />
                    </form>
                </div>
                
        
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
                            <div className="search">
                                <form  style={{ display: "inline" }}>
                                    <input
                                        type="text"
                                        className="inputField"
                                        placeholder="Search Title"
                                        onChange={searchTitle}
                                        
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
                                        onChange={searchCreator}
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
                                <option value="done">Solved</option>
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
                                        <button className="button-3" role="button">View</button>
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