import React, { useState, useEffect } from "react";
import{ db } from "../../firebase";
import { doc, getDoc, collection} from "firebase/firestore";
import Sidebar from '../Sidebar.jsx'
import Answer from '../Answer/index'
import "../../Sidebar.css"
import "./surveyView.css"
import { useNavigate } from "react-router-dom";
import { async } from '@firebase/util';
import { onSnapshot } from "firebase/firestore";
import Chart from 'react-apexcharts'
import { maxValue } from "react-admin";
import { Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

export default function SurveyView() {
    // const surveyID = "";
    // const docRef = doc(db, "surveys", id);
    const [surveys, setSurveys] = useState([]);
    const [questions, setQuestions] = useState([]);
    const { id } = useParams();
    // useEffect(() => {
    //     const fetchSurveyById = onSnapshot(doc(db, "surveys", id), (doc) =>{
    //        setSurveys({...doc.data() })
    //     })
    //     console.log("Current data: ", doc.data());
    //     return () => {
    //         fetchSurveyById()
    //    } 
        
    //  }, [id]);
    
    useEffect(() => {
        
        onSnapshot(collection(db, "surveys", id, "questions"), snapshot => {
            setQuestions(snapshot.docs.map(doc => ({id: doc.id, data: doc.data(), answers: []})))
        } )   
        
        onSnapshot(collection(db, "surveys"), snapshot => {
            setSurveys(snapshot.docs.map(doc => ({id: doc.id, data: doc.data(), answers: []})))
        } ) 

    }, []);

    

    function questionUI(){            
        return questions.map((ques, i)=>
            <div className="question_boxes">
                <div className="add_question">
                    <div className="add_question_top">
                        <p className="question" style={{textAlign: 'left'}}>{i+1}. {ques.data.title}</p>
                        <p className="select" style={{fontSize:"13px", textAlign: 'right'}}>{ques.data.type}</p>

                    </div>
                    <div className="add_question_body"> 
                        <Answer surveyID={id} questionID={ques.id} type={ques.data.type}></Answer>
                    </div>
                    

                </div>
            </div>
        );
    }
    
    
    return (
        <>  
            <Sidebar>
            <div class="sub-nav" style={{display:'flex'}}>
                {/* <h2 style={{display:'inline-block'}}>View survey {id}</h2> */}
                {/* <button style={{display:'inline-block', border: 'solid', borderRadius:'5px', padding: 6, marginLeft: '5%', fontWeight:'bold'}}>{surveys.map(surveys =>((surveys.id === id) &&<i>{surveys.data.status? "Close survey": "Open survey"}</i>))}</button> */}
            </div>
            <div class="App">            
                <div className = "question">
                    <br/>
                        <div className = "section">
                            <div className = "top">
                                <h className="surveyname" style={{color:"black"}}>{surveys.map(surveys =>((surveys.id === id) &&<p>{surveys.data.title}</p>))}</h>
                                <div style={{display:'flex'}}>
                                    <div style={{marginTop: 20, fontSize: 20, marginBottom: -5, display:'inline-block'}}>Expired date</div>
                                    <div style={{marginTop: 20, fontSize: 20, marginBottom: -5, marginLeft: '70%', display:'inline-block'}}>Status</div>
                                    
                                    </div>
                                <div style={{display:'flex'}}>
                                    <div style={{marginTop:30, textAlign: 'left', fontSize: 15, display:'inline-block'}} >
                                        {surveys.map(surveys =>((surveys.id === id) &&<p>{surveys.data.close.toDate().toString()}</p>))}
                                    </div>
                                    <div style={{marginTop:30, fontSize: 15, display:'inline-block', marginLeft:'35%'}}>
                                        {surveys.map(surveys =>((surveys.id === id) &&<p>{surveys.data.status? "Open": "Close"}</p>))}
                                    </div>

                                </div>


                                
                            </div>

                            {questionUI()}
                            
                            <br/> 

                        </div>
                </div>             
            
            </div>
            </Sidebar>
        </>
        
    );
}