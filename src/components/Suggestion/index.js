 
import React, { useState, useEffect } from "react";
import "./suggestion.css";
import{ db } from "../../firebase";
import { doc, getDocs, collection,  query, where, orderBy, startAt} from "firebase/firestore";
import Sidebar from '../Sidebar/index'
import { onSnapshot } from "firebase/firestore";
import SubNav from '../SubNav'
import Pagination from '../Pagination'
import { Link, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";


export default function Suggestion() {

    const suggestionCollection = collection(db, 'suggestions')
    const [suggestions, setSuggestion] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPageSuggest, setCurrentPageSuggest] = useState(1);
    const [itemPerPageSuggest] = useState(10);

    // Get current 
    const indexOfLastItemSuggest = currentPageSuggest * itemPerPageSuggest;
    const indexOfFirstItemSuggest = indexOfLastItemSuggest - itemPerPageSuggest;
    const currentItemSuggest = suggestions.slice(indexOfFirstItemSuggest, indexOfLastItemSuggest);

    // Change page
    const paginateSuggest = pageNumber => setCurrentPageSuggest(pageNumber);
    

    useEffect(() => {
        const fetchSuggestion = onSnapshot(query(collection(db,'suggestions'), orderBy('noti','desc')), snapshot => {
            setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        return () => {
            fetchSuggestion()
        }
    }, []);

    
    
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
        if (e.target.value == "closed") {
            onSnapshot(query(collection(db,'suggestions'), orderBy('status'), where('status','==', 'closed')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else if (e.target.value == "pending") {
            onSnapshot(query(collection(db,'suggestions'), orderBy('status'), where('status','==', 'pending')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else if (e.target.value == "all") {
            onSnapshot(query(collection(db,'suggestions'), orderBy('noti','desc')), snapshot => {
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
        } else if (e.target.value == "event") {
            onSnapshot(query(collection(db,'suggestions'), orderBy('type'), where('type','==', 'EVENT')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else if (e.target.value == "LUNCH") {
            onSnapshot(query(collection(db,'suggestions'), orderBy('type'), where('type','==', 'LUNCH')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else if (e.target.value == "all") {
            onSnapshot(query(collection(db,'suggestions'), orderBy('noti','desc')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else {
            onSnapshot(query(collection(db,'suggestions'), orderBy('type'), where('type','==', 'SNACK')), snapshot => {
                setSuggestion(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        }

    }

    const globalSuggestionSearch = async (e) => {
        if(e.target.value === '') {
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
        if(e.target.value === '') {
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
        if(e.target.value === '') {
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

    function btnDisplayNoti(noti){
        if(noti == true){
            return(
                <button class="button-1" role="button" > New!!! </button>
            )
        } else{
            return(
                <button class="button-3" role="button" > View Suggestion</button>
            )
        }
    }

   

    return (
        <>
        <Sidebar>
        
        <div class="report">
            <SubNav content = {"Suggestion Management"} />
            {/* <h1>Suggestion Management</h1> */}
            
        
        <div className="table-app">
            <div className="global-search">
                    <form  style={{ display: "inline", border:'solid', borderRadius:'8px',padding:'7px' }}>
                        <input
                            type="text"
                            className=""
                            placeholder="  Search All ..."
                            onChange={globalSuggestionSearch}
                        />
                    </form>
                </div>
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
                                <option value="all">All</option>
                                <option value="sanitary">Sanitary</option>
                                <option value="snack" >Snack</option >
                                <option value="event">Event</option>
                                <option value="LUNCH">Lunch</option>
                                <option value="other">Other</option>
                                
                            </select>
                        </th>

                        <th style={{textAlign: "center"}}>Status
                            <select className="dropdown" name="colValue" onChange={sortStatusProcessSuggest}>
                                <option value="all">All</option>
                                <option value="closed">Closed</option>
                                <option value="pending" >Pending </option >
                                <option value="process">Process</option>
                            </select>
                        </th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>   
                </thead>
                <tbody>
                    {currentItemSuggest.map((currentItemSuggest) =>{
                        return (
                            <tr >
                                <td>{currentItemSuggest.data.dateCreate}</td>
                                <td>{currentItemSuggest.data.title}</td>
                                <td>{currentItemSuggest.data.creator}</td>
                                <td>{currentItemSuggest.data.type}</td>
                                <td>{currentItemSuggest.data.status}</td>
                                <td>
                                    <Link to={`/suggest/${currentItemSuggest.id}`}>
                                        {btnDisplayNoti(currentItemSuggest.data.noti)}
                                    </Link>
                                </td>
                            </tr>
                            
                        )
                    })}
                </tbody>
            </table>
            <div class ="pag">
                <Pagination
                    itemPerPage={itemPerPageSuggest}
                    totalItem={suggestions.length}
                    paginate={paginateSuggest}
                    link="/suggest/!#"
                />
            </div>
        </div>
        </div>
        </Sidebar>
        </> 
    );

}