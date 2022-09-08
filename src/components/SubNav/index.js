import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { DashBoardContent, DashBoardWrapper } from "./SubNav.style";
import { collection, getDoc, onSnapshot } from "firebase/firestore";
import{ db } from "../../firebase";
import './subnav.css'
import BellIcon from 'react-bell-icon';
import { red } from "@material-ui/core/colors";
import {  Badge } from 'antd';

const SubNav = ({ content }) => {
    const [reports, setReports] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [repNoti, setRepNoti] = useState(0);
    const [sugNoti, setSugNoti] = useState(0);
    const [notirep, setNotirep] = useState("");
    const [notisug, setNotisug] = useState("");
    const [total, setTotal] = useState(0)
    let count = 0;
    

    useEffect(() => { 
            onSnapshot(collection(db, "reports"), snapshot => {
                setReports(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            } )     
            onSnapshot(collection(db, "suggestions"), snapshot => {
                setSuggestions(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            } ) 
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
        setTotal(sugNoti + repNoti)
        console.log(total)
    })

    function displayNotiBell(noti) {
        if(noti > 0) {
            return (
                <Badge count={5}>
                <BellIcon width='30' height='30' active={true} animate={true} color='red'/>
                </Badge>
            )
        } else {
        }
    }

    return (
        <div className="a">
            <DashBoardWrapper>
                <DashBoardContent>
                    <h3>{content}</h3>
                    <div className="sub-noti">
                        {displayNotiBell(total)}
                    </div>
                </DashBoardContent>
            </DashBoardWrapper>
        </div>
    );
};

export default SubNav;
