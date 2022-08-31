import React, { useState, useEffect , useRef} from "react";
import{ db } from "../../firebase";
import { doc, getDoc, collection, addDoc, updateDoc} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.css';
import { async } from "@firebase/util";
import Chart from 'react-apexcharts';
import "./answer.css";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";


export default function AnswerView(props) {

    const [answers, setAnswers] = useState([]);
    const [title, setTitle] = useState([]);
    const [count, setCount] = useState([]);
    const [data, setData] = useState([]);
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
            if(props.type === "DATEPICK"){
                setData(answers.map(ans=>({select: ans.data.choiceCount, title: ans.data.title})))
            }

        }
    }, [answers])

    console.log(props.surveyID)
      console.log(answers);
      console.log(count);
      console.log(title);


      return (
        <>
        {props.type !== "SHORTANSWER"
         && props.type !=="DATEPICK" 
         ? (
                <Chart type="pie" style={{textAlign:"Right"}}
                                width={500}
                                height={200}    
                                series = {count}
                                options={{
                                    noData:{text: "Empty Data"},
                                    labels:title
                            }}></Chart>) : 
                            props.type !== "DATEPICK"?
                            (<div class="answerContainer">
                                {title.map(title=>(<div class="answer">"{title}"</div>))}
                            </div>)
                            : (<BarChart width={500} height={200} data={data}>
                                <CartesianGrid strokeDasharray="1 1" />
                                <XAxis dataKey="title" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="select" fill="#8884d8"/>
                                </BarChart>)
                        }
        </>
      )
}