 
import React, { useState, useEffect } from "react";
import "./suggestion.css";
import{ db } from "../../firebase";
import { doc, getDocs, collection,  query, where, orderBy, startAt} from "firebase/firestore";
import Sidebar from '../Sidebar.jsx'
import { onSnapshot } from "firebase/firestore";
import "../../Sidebar.css"
import SubNav from '../SubNav'
import Pagination from '../Pagination'
import { Link, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";


export default function Suggestion() {

    const suggestionCollection = collection(db, 'suggestions')
    const [suggestions, setSuggestion] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(7);

    // the search result
    //  const [results, setResults] = useState(currentItem);    
    

    useEffect(() => {
        const fetchSuggestion = onSnapshot(suggestionCollection, snapshot => {
            setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        } )
        return () => {
            fetchSuggestion()
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
    
    const sortSuggestionDate = async (e) => {
        if (e.target.value =='asc') {
            onSnapshot(query(collection(db,'suggestions'), orderBy('dateCreate','asc')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else {
            onSnapshot(query(collection(db,'suggestions'), orderBy('dateCreate','desc')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        }
    }

    const sortStatusProcessSuggest = async (e) => {
        if (e.target.value == "solved") {
            onSnapshot(query(collection(db,'suggestions'), orderBy('status'), where('status','==', 'solved')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else if (e.target.value == "pending") {
            onSnapshot(query(collection(db,'suggestions'), orderBy('status'), where('status','==', 'pending')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else {
            onSnapshot(query(collection(db,'suggestions'), orderBy('status'), where('status','==', 'process')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        }
    }

    const sortTypeSuggest = async (e) => {
        
        if (e.target.value == "sanitary") {
            onSnapshot(query(collection(db,'suggestions'), orderBy('type'), where('type','==', 'SANITARY')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else if (e.target.value == "other") {
            onSnapshot(query(collection(db,'suggestions'), orderBy('type'), where('type','==', 'Other')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else if (e.target.value == "device") {
            onSnapshot(query(collection(db,'suggestions'), orderBy('type'), where('type','==', 'Device')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else if (e.target.value == "food") {
            onSnapshot(query(collection(db,'suggestions'), orderBy('type'), where('type','==', 'Food')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else {
            onSnapshot(query(collection(db,'suggestions'), orderBy('type'), where('type','==', 'SNACK')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        }

    }

    const globalSuggestionSearch = async (e) => {
        if(e.target.value === null) {
            onSnapshot(suggestionCollection, snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            } )
        } else {

                setSuggestion(suggestions.filter(
                    (suggestions) => 
                    suggestions.data.creator.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    suggestions.data.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    suggestions.data.type.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    suggestions.data.dateCreate.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    suggestions.data.status.toLowerCase().includes(e.target.value.toLowerCase()) 
                ));
        }        
    }
    
    const searchSuggestionTitle = async (e) => {
        if(e.target.value === null) {
            onSnapshot(suggestionCollection, snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            } )
        } else {

                setSuggestion(suggestions.filter(
                    (suggestions) => 
                    suggestions.data.title.toLowerCase().includes(e.target.value.toLowerCase())
                ));
        }        
    }

    const searchSuggestionCreator = async (e) => {
        if(e.target.value === null) {
            onSnapshot(suggestionCollection, snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            } )
        } else {

                setSuggestion(suggestions.filter(
                    (suggestions) => 
                    suggestions.data.creator.toLowerCase().includes(e.target.value.toLowerCase())
                ));
        }        
    }

    // Get current 
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItem = suggestions.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
        <Sidebar>
        
        <div class="report">
            <SubNav content = {"Suggestion"} />
            <h1>Suggestion Management</h1>
            <div className="global-search">
                    <form  style={{ display: "inline" }}>
                        <input
                            type="text"
                            className=""
                            placeholder="  Search All ..."
                            onChange={globalSuggestionSearch}
                        />
                    </form>
                </div>
        
        <div className="table-app">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>Date Created
                            <select className="dropdown" name="colValue" onChange={sortSuggestionDate}>
                                <option value="asc">Asc</option>
                                <option value="desc" >Desc</option >
                            </select>
                        </th>
                        <th style={{textAlign: "center"}}>Title
                            <div class="search">
                                <form  style={{ display: "inline" }}>
                                    <input
                                        type="text"
                                        className="inputField"
                                        placeholder="Search Title"
                                        onChange={searchSuggestionTitle}
                                        
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
                                        onChange={searchSuggestionCreator}
                                    />
                                </form>
                            </div>
                        </th>

                        <th style={{textAlign: "center"}}>Type
                            <select className="dropdown" name="colValue" onChange={sortTypeSuggest}>
                                <option value="sanitary">Sanitary</option>
                                <option value="snack" >Snack</option >
                                <option value="device">Device</option>
                                <option value="other">Other</option>
                                <option value="food">Food</option>
                            </select>
                        </th>

                        <th style={{textAlign: "center"}}>Status
                            <select className="dropdown" name="colValue" onChange={sortStatusProcessSuggest}>
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
                                    <Link to={`/suggest/${currentItem.id}`}>
                                        <button class="button-3" role="button">View</button>
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
                    totalItem={suggestions.length}
                    paginate={paginate}
                />
            </div>
        </div>
        </div>
        </Sidebar>
        </> 
    );

}