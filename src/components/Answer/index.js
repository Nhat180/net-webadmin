import React, { useState, useEffect , useRef} from "react";
import{ db } from "../../firebase";
import { doc, getDoc, collection, addDoc, updateDoc} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.css';
import { async } from "@firebase/util";
import Chart from 'react-apexcharts';
import "./answer.css";


export default function AnswerView(props) {

    const [answers, setAnswers] = useState([]);
    const [title, setTitle] = useState([]);
    const [count, setCount] = useState([]);
    const answerCollection = collection(db, "surveys", props.surveyID, "questions", props.questionID, "answers")
   

    useEffect(() => {    
        const fetchAnswers = onSnapshot(answerCollection, snapshot => {
            setAnswers(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        } )
        return () => {
            fetchAnswers()
        }
    }, []);

    useEffect(()=>{
        if(answers != {}){
            setTitle(answers.map(function(obj) {
                return obj.data.title
            }))
            if(props.type !== "SHORTANSWER"){
                setCount(answers.map(function(obj) {
                    return obj.data.choiceCount
                }))

            }

        }
    }, [answers])

      console.log(answers);
      console.log(count);
      console.log(title);


      return (
        <>
        {props.type !== "SHORTANSWER" ? (
                <Chart type="pie" style={{textAlign:"Right"}}
                                width={500}
                                height={200}
                                series = {count}
                                options={{
                                    noData:{text: "Empty Data"},
                                    labels:title
                            }}></Chart>) : (<div class="answerContainer">
                                {title.map(title=>(<div class="answer">"{title}"</div>))}
                            </div>)}
        </>
      )
}