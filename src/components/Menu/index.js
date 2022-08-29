import React, { useState, useEffect } from "react";
import "./menu.css";
import{ db } from "../../firebase";
import { doc, getDoc, collection} from "firebase/firestore";
import Sidebar from '../Sidebar.jsx'
import { onSnapshot } from "firebase/firestore";
import "../../Sidebar.css"
import SubNav from '../SubNav'
import 'bootstrap/dist/css/bootstrap.css';
import { TbRefresh} from "react-icons/tb"


export default function Menu() {
    
    const api ="https://netcompany-crawl-server.herokuapp.com/menu";
    const menuCollection = collection(db, 'lunch')
    const [menu, setMenu] = useState([]);
    


    // getDoc(docMonday).then((snapshot) => {
    //     setMenuMon(snapshot.data(), snapshot.id)
    // })
    // console.log(menuMon)

    // getDoc(docTue).then((snapshot) => {
    //     setMenuTue(snapshot.data(), snapshot.id)
    // })

    
    // useEffect(() => {
    //     const fetchMon = onSnapshot(docMonday, snapshot => {            
    //         setMenuMon(snapshot.data(), snapshot.id) 
    //     }) 
    //      return () => {
    //         fetchMon();
    //      }
    // }, []);


    useEffect(() => {
        const fetchMenu = onSnapshot(menuCollection, snapshot => {
            setMenu(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        } )
        return () => {
            fetchMenu()
        }
    }, []);
   

    const updateMenu = async () => {
        const response = await fetch(api, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username": 'pct',
                "password": 'Nhatrangg@2022'
              })
        })
    
        if( response.status === 500 || response.status === 200){
            console.log('success')
          } else {
            console.log('Disconnection')
          }
    }
    
    return (
        <>  
            <Sidebar>
            <div >
                <SubNav content = {"Menu"} />
                <h1>LUNCH MENU</h1>
                <div className="time">
                    <div class="time-column-left">
                        {menu.map(menu =>((menu.id === 'updateTime') &&<div>Last Updated: {menu.data.updatedTimeField.toDate().toLocaleTimeString("en-US")}, {menu.data.updatedTimeField.toDate().toDateString()}</div>))}
                    </div>
                    <div class="time-column-right">
                        <button className="refresh" onClick={updateMenu}>
                            <div ><TbRefresh /></div>
                            <div  >Refresh</div>
                        </button> 
                    </div>
                </div>
                            
                <div class="App">
                    <table class="menu-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>
                                    Monday
                                    {/* <br></br>
                                    {menu.map(menu =>((menu.id === 'mon') &&<div> {menu.data.timestamp.toDate().toDateString()}</div>) )} */}
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
