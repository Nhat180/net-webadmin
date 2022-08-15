import React, { useState, useEffect } from "react";
import { Accordion, Button, FormControl, Nav, Spinner } from "react-bootstrap";
import{ db } from "../../firebase";
import { doc, getDoc, collection, connectFirestoreEmulator} from "firebase/firestore";
import { SignIn } from "../SignIn/index";
import Sidebar from '../Sidebar.jsx'
import {setDoc, addDoc} from 'firebase/firestore'
import "../../Sidebar.css"
import "./surveyCreate.css"
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

export default function SurveyCreate() {
    const [questions, setQuestions] = useState(
        [{
            questionText: "What is 1+1?",
            questionType: "radio",
            options : [
                {optionText: "3"},
                {optionText: "2"},
                {optionText: "1"},
                {optionText: "0"}
            ],
            open: true
        }]
    )

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
            optionQuestion[i].options.push({optionText: "Option " + (optionQuestion[i].options.length + 1)});
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
        qs.splice(i + 1, 0, {questionText: "Question", questionType:"radio", options:[{optionText:"Option 1"}], open: true})
        setQuestions(qs)
    }

    function submitsurvey(){

    }

    function questionUI(){
        // return (
        //     <div> testing</div>
        // )
        return questions.map((ques, i)=>
            <div>
                <Accordion expanded = {questions[i].open} className={questions[i].open ? 'add_border': ""}>
                    <AccordionSummary  elevation={1} style={{width:'100%'}}>
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
                    </AccordionSummary>

                    <div className="question_boxes">
                        <AccordionDetails className="add_question">
                            <div className="add_question_top">
                                <input type="text" className="question" placeholder="Question" value={ques.questionText} onChange={(e)=>{changeQuestion(e.target.value, i)}}></input>
                                <Select className="select" style={{color:"#5f6368", fontSize:"13px"}} value={ques.questionType}>
                                    <MenuItem id="text" value="Text" onClick={()=>{addQuestionTypeNoOption(i, "text")}}> Text input</MenuItem>
                                    <MenuItem id="likert" value="Likert" onClick={()=>{addQuestionTypeNoOption(i, "likert")}}> Rating</MenuItem>
                                    <MenuItem id="checkbox" value="Checkbox" onClick={()=>{addQuestionType(i, "checkbox")}}> Multiple choice</MenuItem>
                                    <MenuItem id="radio" value = "Radio" onClick={()=>{addQuestionType(i, "radio")}}> Single choice</MenuItem>
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
                            <input type="text" className="surveyname" style={{color:"black"}} placeholder="Untitled survey" ></input>
                            <p style={{textAlign: 'left', marginTop: 20, fontSize: 20, marginBottom: -5}}>Expired date</p>
                            <input type="date" className="deadline" style={{width:"100px", marginRight:"600px", marginTop:"20px"}}></input>


                            
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
