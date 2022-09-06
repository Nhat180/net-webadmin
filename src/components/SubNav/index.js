import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { DashBoardContent, DashBoardWrapper } from "./SubNav.style";
import { collection, getDoc, onSnapshot } from "firebase/firestore";
import{ db } from "../../firebase";
const SubNav = ({ content }) => {
    const [reports, setReports] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [repNoti, setRepNoti] = useState(0);
    const [sugNoti, setSugNoti] = useState(0);
    const [notirep, setNotirep] = useState("");
    const [notisug, setNotisug] = useState("");
    let count = 0;

    useEffect(() => { 
        if(content === "Report"){
            onSnapshot(collection(db, "reports"), snapshot => {
                setReports(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            } ) 
        }           
        if(content === "Suggestion"){
            onSnapshot(collection(db, "suggestions"), snapshot => {
                setSuggestions(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            } ) 
        }  
    }, []);

    useEffect(()=>{
        count = 0
        if(suggestions !== [{}]){
            suggestions.map(function(obj) {
                if(obj.data.noti === true){
                    count += 1
                    setSugNoti(count)
                }
            })
            setNotisug("(" + sugNoti + " new messages)")
        }

        if(reports !== []){
            
            reports.map(function(obj) {
                if(obj.data.noti === true){
                    count += 1
                    setRepNoti(count)
                }
            })
            setNotirep("(" + repNoti + " new messages)")
        }
    })

    return (
        <div className="a">
            <DashBoardWrapper>
                <DashBoardContent>
                    <h3>{content}</h3>
                    <div>
                        <div>
                            <Link to="/">Dashboard</Link>
                        </div>
                        <span>{content} {(content === "Report" && repNoti !== 0 )?notirep : ""} {(content === "Suggestion" && sugNoti !== 0 )?notisug : ""}</span>
                    </div>
                </DashBoardContent>
            </DashBoardWrapper>
        </div>
    );
};

export default SubNav;
