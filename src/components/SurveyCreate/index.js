import React, { useState, useEffect } from "react";
import { Accordion, Button, FormControl, Nav, Spinner } from "react-bootstrap";
import{ db } from "../../firebase";
import { doc, getDoc, collection, connectFirestoreEmulator, Timestamp} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { SignIn } from "../SignIn/index";
import Sidebar from '../Sidebar.jsx'
import {setDoc, addDoc} from 'firebase/firestore'
import {  Routes, Route } from "react-router-dom";
import "../../Sidebar.css"
import "./surveyCreate.css"
import { useNavigate } from "react-router-dom";
import { AccordionSummary, AccordionDetails, IconButton } from "@mui/material";
import { Typography } from "antd";
import { style, width } from "@mui/system";
import {FormControlLabel} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import {BsTrash} from 'react-icons/bs';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { async } from '@firebase/util';

export default function SurveyCreate() {
    const [questions, setQuestions] = useState(
        [{
            questionText: "",
            questionType: "radio",
            status: true,
            options : [
                {optionText: ""},
            ],
            open: true
        }]
    )

    let navigate = useNavigate();
    let auth = getAuth();

    const [surveyName, setSurveyName] = useState();
    const [surveyDeadline, setSurveyDeadline] = useState();

    function changeQuestion(text, i){
        var newQuestion = [...questions];
        newQuestion[i].questionText = text;
        setQuestions(newQuestion);
        console.log(questions)
    }

    function addQuestionType(i, type){
        var qs = [...questions];
        qs[i].questionType = type;
        setQuestions(qs);
        console.log(type)
    }

    function addQuestionTypeNoOption(i, type){
        var qs = [...questions];
        qs[i].questionType = type;
        qs[i].options = [];
        setQuestions(qs);
        
    }

    function changeOptionValue(text, i, j){
        var optionQuestion = [...questions];
        optionQuestion[i].options[j].optionText = text;
        setQuestions(optionQuestion);
    }

    function removeOption(i, j){
        var optionQuestion = [...questions];
        if(optionQuestion[i].options.length > 1){
            optionQuestion[i].options.splice(j, 1);
            setQuestions(optionQuestion);
        }
    }

    function addOption(i){
        var optionQuestion = [...questions];
        if(optionQuestion[i].options.length < 5){
            optionQuestion[i].options.push({optionText: "" + (optionQuestion[i].options.length + 1)});
            setQuestions(optionQuestion);
        }
    }

    function copyQuestion(i){
        var qs = [...questions];
        var newQuestion = JSON.parse(JSON.stringify(qs[i]));
        qs.splice(i+1, 0, newQuestion);

        setQuestions(qs)
    }

    function deleteQuestion(i){
        var qs = [...questions];
        if(questions.length > 1){
            qs.splice(i, 1);
        }
        setQuestions(qs)
    }

    function addQuestion(i){
        var qs = [...questions];
        qs.splice(i + 1, 0, {questionText: "", questionType:"radio", options:[{optionText:""}], open: true})
        setQuestions(qs)
    }

    async function submitsurvey(){
        if(surveyName == null){
            return (alert("Survey name must be filled"))
        }
        if(surveyDeadline == null){
            return (alert("Survey deadline must be set"))
        }
        for(let i = 0; i < questions.length; i ++){
            if(questions[i].questionText == ""){
                return (alert("All question name must be set"))
            }
            for (let j = 0; j < questions[i].options.length; j ++){
                if(questions[i].options[j].optionText == ""){
                    return (alert("All option text must be filled"))
                }
            }
        }

        let type = ["radio", "checkbox", "text", "date", "likert"];
        let fbType = ["SINGLECHOICE", "MULTIPLECHOICE", "SHORTANSWER", "DATEPICK", "LIKERTSCALE"];
        let user = auth.currentUser.email.slice(0, auth.currentUser.email.length - 10);
        let surveyID = Timestamp.fromMillis(Date.parse(surveyDeadline)).toString;
        var docData = {
            title: surveyName,
            close: Timestamp.fromMillis(Date.parse(surveyDeadline)),
            created: Timestamp.fromDate(new Date()),
            status: true,
            createdBy: user + "",
            usersHaveTaken: []
        }
        let svdoc = await addDoc(collection(db, "surveys"), docData);
        
        // const docRef = doc(db, "surveys", surveyID);
        // setDoc(docRef, docData);
        for(let i = 0; i < questions.length; i ++){
            var quesType = "SINGLECHOICE"
            for (let j = 0; j < type.length; j++){
                if(type[j] == questions[i].questionType){
                    quesType = fbType[j];
                }
            }

            var quesData = {
                title: questions[i].questionText + "",
                type: quesType + ""
            }
            await setDoc(doc(db, "surveys", svdoc.id, "questions", questions[i].questionText), quesData);

            if(questions[i].questionType == "radio" || questions[i].questionType == "checkbox"){
                for(let j = 0; j < questions[i].options.length; j ++){
                    var ansData = {
                        choiceCount: 0,
                        title: questions[i].options[j].optionText + ""
                    }
                    let awid = j + ""
                    await setDoc(doc(db, "surveys", svdoc.id, "questions", questions[i].questionText, "answers", awid), ansData);
                }
            } else if(questions[i].questionType == "likert"){
                var ansData = {
                    choiceCount: 0,
                    title: "Terrible"
                }
                await setDoc(doc(db, "surveys", svdoc.id, "questions", questions[i].questionText, "answers", "0"), ansData);
                ansData.title = "Bad";
                await setDoc(doc(db, "surveys", svdoc.id, "questions", questions[i].questionText, "answers", "1"), ansData);
                ansData.title = "Neutral";
                await setDoc(doc(db, "surveys", svdoc.id, "questions", questions[i].questionText, "answers", "2"), ansData);
                ansData.title = "Good";
                await setDoc(doc(db, "surveys", svdoc.id, "questions", questions[i].questionText, "answers", "3"), ansData);
                ansData.title = "Satisfied";
                await setDoc(doc(db, "surveys", svdoc.id, "questions", questions[i].questionText, "answers", "4"), ansData);

            }
        }
        return console.log("test");
    }

    function questionUI(){
        // return (
        //     <div> testing</div>
        // )
        return questions.map((ques, i)=>
            <div>
                <Accordion expanded = {questions[i].open} className={questions[i].open ? 'add_border': ""}>
                    {/* <AccordionSummary  elevation={1} style={{width:'100%'}}>
                        {!questions[i].open ? (
                             <div className="saved_question">
                                <Typography style={{fontSize:"15px", fontWeight:"400", letterSpacing: '.1px', lineHeight:'24px', paddingBottom:"8px"}}>
                                    {i+1}.{questions[i].questionText}
                                </Typography>


                                {ques.options.map((op, j)=>
                                    <div key={j}>
                                        <div style={{display: 'flex'}}>
                                            <FormControlLabel style={{marginLeft:"5px", marginBottom:"5px"}} display control={<input type={ques.questionType}
                                            color="primary" style={{marginRight:"3px"}} required={ques.type} disabled/>} label={
                                                <Typography style={{fontFamily: 'Roboto, Arial, sans-serif',
                                                    fontSize:'13px',
                                                    fontWeight:'400',
                                                    letterSpacing:'.2px',
                                                    lineHeight:'20px',
                                                    color: '#202124'}}>
                                                    {ques.options[j].optionText}    
                                                </Typography>
                                            }/>
                                        </div>
                                    </div>
                                )} 
                            </div>
                         ): ""}
                    </AccordionSummary> */}

                    <div className="question_boxes">
                        <AccordionDetails className="add_question">
                            <div className="add_question_top">
                                <input type="text" className="question" placeholder="Question" value={ques.questionText} onChange={(e)=>{changeQuestion(e.target.value, i)}}></input>
                                <Select className="select" style={{fontSize:"13px"}} defaultValue={ques.questionType}>
                                    <MenuItem id="radio" value = "Radio" onClick={()=>{addQuestionType(i, "radio")}}> Single choice</MenuItem>
                                    <MenuItem id="checkbox" value="Checkbox" onClick={()=>{addQuestionType(i, "checkbox")}}> Multiple choice</MenuItem>
                                    <MenuItem id="text" value="Text" onClick={()=>{addQuestionTypeNoOption(i, "text")}}> Text input</MenuItem>
                                    <MenuItem id="date" value="Date" onClick={()=>{addQuestionTypeNoOption(i, "date")}}> Date pick</MenuItem>
                                    <MenuItem id="likert" value="Likert" onClick={()=>{addQuestionTypeNoOption(i, "likert")}}> Rating</MenuItem>
                                </Select>

                            </div>
                            {                                
                                ques.options.map((op, j)=>(
                                    <div className="add_question_body" key={j}>
                                        {/* {
                                            (ques.questionType=="radio" || ques.questionType == "checkbox") ?:
                                            <div/>
                                        } */}
                                        <input type={ques.questionType} style={{marginRight:"10px"}} disabled/>
                                        <div>
                                            <input type="text" className="text_input" placeholder="option" value={ques.options[j].optionText} onChange={(e)=>{changeOptionValue(e.target.value, i, j)}}/>
                                        </div>

                                        <IconButton aria-label="delete">
                                            <CloseIcon onClick={()=>{removeOption(i, j)}}/>
                                        </IconButton>

                                    </div>
                                )) 
                            }
                            {
                                ques.options.length < 5?(
                                    <div className="add_question_body">
                                        <FormControlLabel disabled control={
                                            // (ques.questionType=="radio" || ques.questionType == "checkbox") ?
                                            <input type={ques.questionType} style={{marginRight:"10px", marginLeft:"10px"}} disabled
                                            color="primary" inputProps={{'arial-label': 'secondary checkbox'}}/>
                                            // :""                                           
                                        } label={
                                            (ques.questionType=="radio" || ques.questionType == "checkbox") ?
                                            <div>
                                                <input type="text" className="text_input" style={{fontSize:"13px", width:"310px"}} placeholder="Add another option" disabled/>
                                                <Button size="small" style={{textTransform: 'none', color:"#4285f4", fontSize:"13px", fontWeight:"600"}} onClick={()=>{addOption(i)}}>
                                                    Add option
                                                </Button>
                                            </div>
                                             : ""
                                        }/>
                                    </div>
                                ): ""
                            }
                            <div className="add_footter">
                                <div className="add_question_bottom">
                                    <IconButton aria-label="Copy" onClick={()=>{copyQuestion(i)}}>
                                        <FilterNoneIcon/>
                                    </IconButton>
                                    <IconButton arial-label="Delete" onClick={()=>{deleteQuestion(i)}}>
                                        <BsTrash/>
                                    </IconButton>
                                    <IconButton onClick={()=>{addQuestion(i)}}>
                                        <AddCircleOutlineIcon/>
                                    </IconButton>
                                </div>
                            </div>
                        </AccordionDetails>
                    </div>
                </Accordion>
            </div>
        )
    }
    
    
    return (
        <>  
            <Sidebar>
            <div class="sub-nav">
                <h2>Create Survey</h2>
            </div>
            <div class="App">            
                <div className = "question">
                    <br/>
                    <div className = "section">
                        <div className = "top">
                            <input type="text" className="surveyname" style={{color:"black"}} placeholder="Untitled survey" onChange={(e)=> setSurveyName(e.target.value)}></input>
                            <p style={{textAlign: 'left', marginTop: 20, fontSize: 20, marginBottom: -5}}>Expired date</p>
                            <input type="datetime-local" className="deadline" style={{width:"150px", marginRight:"600px", marginTop:"20px"}} onChange={(e)=>setSurveyDeadline(e.target.value)}></input>


                            
                        </div>

                        {questionUI()}
                        
                        <br/>
                        <Button className="submitbtn" onClick={()=>{submitsurvey()}}>
                            Create Survey
                        </Button>   

                    </div>
                </div>             
            
            </div>
            </Sidebar>
        </>
        
    );
}
