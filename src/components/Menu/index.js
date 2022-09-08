import React, { useState, useEffect, CSSProperties } from "react";
import "./menu.css";
import{ db } from "../../firebase";
import { doc, getDoc, collection} from "firebase/firestore";
import Sidebar from '../Sidebar/index'
import { onSnapshot } from "firebase/firestore";
import SubNav from '../SubNav'
import 'bootstrap/dist/css/bootstrap.css';
import { TbRefresh} from "react-icons/tb"
import { getAuth } from "firebase/auth";
import MoonLoader from "react-spinners/MoonLoader";
import LoadingOverlay from 'react-loading-overlay';
import styled, { css } from "styled-components";

var CryptoJS = require("crypto-js");

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${props =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

export default function Menu() {
    
    const api ="https://netcompany-crawl-server.herokuapp.com/menu";
    const menuCollection = collection(db, 'lunch')
    const [menu, setMenu] = useState([]);
    const [loaded, setLoaded] = useState(true);
    const [color, setColor] = useState("#ffffff");
    let secret = ""
    let auth = getAuth()
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };
    
    //   useEffect(() => {
    //     // visible true -> false
    //     if (!loaded) {
    //       //setTimeout(() => setLoaded(true), 250); // 0.25초 뒤에 해제
    //       //debugger;
    //       setTimeout(() => setLoaded(true), 10000); // 10초 뒤에
    //     }
    
    //     //setLoaded(loaded);
    //   }, [loaded]);

    useEffect(() => {
        const fetchMenu = onSnapshot(menuCollection, snapshot => {
            setMenu(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        } )
        return () => {
            fetchMenu()
        }
    }, []);
   

    const updateMenu = async () => {
        setLoaded(!loaded)
        if(auth.currentUser.email !== "admin@gmail.com"){
            const docRef = await doc(db, "temp", auth.currentUser.accessToken.substring(0, 20));
            const docSnap = await getDoc(docRef);
            console.log(docSnap.get("secret"))
            secret = CryptoJS.AES.decrypt(docSnap.get("secret"), "Netcompany@2022Capstone").toString(CryptoJS.enc.Utf8)
            let username = auth.currentUser.email.substring(0, auth.currentUser.email.length - 10)
    
    
            const response = await fetch(api, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "username": username,
                    "password": secret
                  })
            })
            
            if( response.status === 500 || response.status === 200){
                (alert("Menu updated successfully"))
                setLoaded(loaded)
              } else {
                setLoaded(loaded)
                (alert("Menu update failed"))
              }
            
        } else{
            alert("admin default account cannot reset menu")
        }
    }
    
    return (
        <>  
            <Sidebar>
            
            <div className="main">
                <SubNav content = {"Menu"} />
                <h1>LUNCH MENU</h1>
                <div className="time">
                    <div className="time-column-left">
                        {menu.map(menu =>((menu.id === 'updateTime') &&<div>Last Updated: {menu.data.updatedTimeField.toDate().toLocaleTimeString("en-US")}, {menu.data.updatedTimeField.toDate().toDateString()}</div>))}
                    </div>
                    <div className="time-column-right">
                            <button className="refresh" onClick={updateMenu} style={{backgroundColor: '#0f2147', color:"white", border:'solid', borderRadius:'8px',padding:'7px' }} >
                                <div ><TbRefresh /></div>
                                <div  >Refresh</div>
                            </button>
                            <DarkBackground disappear={!loaded}>
                            <LoadingOverlay
                                active={true}
                                spinner={true}
                                text='Update new menu...'
                                >
                            </LoadingOverlay>
                            </DarkBackground> 
                    </div>
                </div>
                            
                <div className="App">
                    <table className="menu-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>
                                    Monday
                                   
                                </th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                            </tr>
                        </thead>
                        <tbody>
                <tr>
                        <th>Main</th>
                        <th>
                            {menu.map(menu =>((menu.id === 'mon') &&<div> {menu.data.main[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'mon') &&<div> {menu.data.main[1]}</div>) )}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'mon') &&<div> {menu.data.main[2]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'tue') &&<div> {menu.data.main[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'tue') &&<div> {menu.data.main[1]}</div>) )}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'tue') &&<div> {menu.data.main[2]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'wed') &&<div> {menu.data.main[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'wed') &&<div> {menu.data.main[1]}</div>) )}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'wed') &&<div> {menu.data.main[2]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'thu') &&<div> {menu.data.main[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'thu') &&<div> {menu.data.main[1]}</div>) )}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'thu') &&<div> {menu.data.main[2]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'fri') &&<div> {menu.data.main[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'fri') &&<div> {menu.data.main[1]}</div>) )}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'fri') &&<div> {menu.data.main[2]}</div>) )}
                        </th>
                    </tr>

                    <tr>
                        <th>Side</th>
                        <th>
                            {menu.map(menu =>((menu.id === 'mon') &&<div> {menu.data.side[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'mon') &&<div> {menu.data.side[1]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'tue') &&<div> {menu.data.side[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'tue') &&<div> {menu.data.side[1]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'wed') &&<div> {menu.data.side[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'wed') &&<div> {menu.data.side[1]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'thu') &&<div> {menu.data.side[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'thu') &&<div> {menu.data.side[1]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'fri') &&<div> {menu.data.side[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'fri') &&<div> {menu.data.side[1]}</div>) )}
                        </th>
                    </tr>

                    <tr>
                        <th>Soup</th>
                        <th>
                            {menu.map(menu =>((menu.id === 'mon') &&<div> {menu.data.soup[0]}</div>))}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'tue') &&<div> {menu.data.soup[0]}</div>))}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'wed') &&<div> {menu.data.soup[0]}</div>))}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'thu') &&<div> {menu.data.soup[0]}</div>))}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'fri') &&<div> {menu.data.soup[0]}</div>))}
                        </th>
                    </tr>

                    <tr>
                        <th>Dessert</th>
                        <th>
                            {menu.map(menu =>((menu.id === 'mon') &&<div> {menu.data.dessert[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'mon') &&<div> {menu.data.dessert[1]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'tue') &&<div> {menu.data.dessert[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'tue') &&<div> {menu.data.dessert[1]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'wed') &&<div> {menu.data.dessert[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'wed') &&<div> {menu.data.dessert[1]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'thu') &&<div> {menu.data.dessert[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'thu') &&<div> {menu.data.dessert[1]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'fri') &&<div> {menu.data.dessert[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'fri') &&<div> {menu.data.dessert[1]}</div>) )}
                        </th>
                    </tr>

                    
                </tbody>
            </table>
                </div>
            </div>
           
            </Sidebar>
        </>
        
    );
}
