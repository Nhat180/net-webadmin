 
import React, { useState, useEffect } from "react";
import "./survey.css";
import{ db } from "../../firebase";
import { doc, getDocs, collection,  query, where, orderBy, setDoc, updateDoc} from "firebase/firestore";
import Sidebar from '../Sidebar/index'
import { onSnapshot } from "firebase/firestore";
// import "../../Sidebar.css"
import SubNav from '../SubNav'
import Pagination from '../Pagination'
import { Link, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";


export default function Survey() {

    const surveyCollection = collection(db, 'surveys')
    const [survey, setSurvey] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(7);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchSurvey = onSnapshot(query(collection(db, 'surveys'), orderBy('status','desc')), snapshot => {
            setSurvey(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            survey.map(async(survey)=>{
                console.log(survey.id)
                if(survey.data.close.toDate() < new Date()){
                    await updateDoc(doc(db, "surveys", survey.id), {status: false})
                }
            })
        } )
        return () => {
            fetchSurvey()
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
 
      const routeChange = () =>{ 
        let path = `/surveyCreate`; 
        navigate(path);
    }

    // Get current 
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItem = survey.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const sortSurveyStatus = async (e) => {
        if (e.target.value == "all") {
            onSnapshot(surveyCollection, snapshot => {
                setSurvey(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else if (e.target.value == "closed") {
            onSnapshot(query(collection(db,'surveys'), orderBy('status'), where('status','==', false)), snapshot => {
                setSurvey(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else {
            onSnapshot(query(collection(db,'surveys'), orderBy('status'), where('status','==', true)), snapshot => {
                setSurvey(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        }
    }

    const globalSearch = async (e) => {
        if(e.target.value === '') {
            onSnapshot(surveyCollection, snapshot => {
                setSurvey(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            } )
        } else {

                setSurvey(survey.filter(
                    (survey) => 
                    survey.data.createdBy.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    survey.data.title.toLowerCase().includes(e.target.value.toLowerCase())  
                ));
        }        
    }

    return (
        <>
        <Sidebar>
        
        <div class="report">
            <SubNav content = {"Survey"} />
            <h1>Survey Management</h1>            
            <div class="query">
                <div className="global-search">
                    <form  style={{ display: "inline" }}>
                        <input
                            type="text"
                            placeholder="  Search All ..."
                            onChange={globalSearch}
                        />
                    </form>
                </div>
                <div className="sort">
                    <button onClick={()=>routeChange()} className="button-3"> Create survey</button>
                </div> 
            </div>
        
        <div className="table-app">
        <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>Date Created</th>
                        <th style={{textAlign: "center"}}>Title</th>
                        <th style={{textAlign: "center"}}>Creator</th>
                        <th style={{textAlign: "center"}}>Close time</th>
                        <th style={{textAlign: "center"}}>Status
                            <select className="dropdown" name="colValue" onChange={sortSurveyStatus}>
                                <option value="all">All</option>
                                <option value="open">Open</option>
                                <option value="closed" >Closed</option >
                            </select>
                        </th>
                        <th style={{textAlign: "center"}}>Action</th>

                    </tr>   
                </thead>
                <tbody>
                    {currentItem.map((currentItem) =>{
                        return (
                            <tr >
                                <td>{currentItem.data.created.toDate().toDateString()}</td>
                                <td>{currentItem.data.title}</td>
                                <td>{currentItem.data.createdBy}</td>
                                <td>{currentItem.data.close.toDate().toDateString()}</td>
                                <td>{currentItem.data.status ? 'Open' :'Closed' }</td>
                                <td>
                                    <Link to={`/surveyView/${currentItem.id}`}>
                                        <button className="button-3" role="button">View Statistics</button>
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
                    totalItem={survey.length}
                    paginate={paginate}
                />
            </div>
        </div>
        </div>
        </Sidebar>
        </> 
    );

}