import React, { useState, useEffect } from "react";
import SubNav from "../SubNav";
import "./menu.css";
import { Nav, Spinner } from "react-bootstrap";
import{ db } from "../../firebase";
import { doc, getDoc, collection, connectFirestoreEmulator} from "firebase/firestore";
import { SignIn } from "../SignIn/index";
import Sidebar from '../Sidebar.jsx'
import { onSnapshot } from "firebase/firestore";
import "../../Sidebar.css"
import Navbar from '../Navbar1'

export default function Menu() {
    
    const api ="https://netcompany-crawl-server.herokuapp.com/menu";
    const menuCollection = collection(db, 'lunch')
    const [menu, setMenu] = useState([]);
    // const [menuMon, setMenuMon] = useState([]);
    // const [menuTue, setMenuTue] = useState([]); 
    // const [menuWed, setMenuWed] = useState([]); 
    // const [menuThu, setMenuThu] = useState([]); 
    // const [menuFri, setMenuFri] = useState([]); 
    // const docMonday = doc(db, "lunch", "mon");
    // const docTue = doc(db, "lunch", "tue");
    // const docWed = doc(db, "lunch", "wed");
    // const docThu = doc(db, "lunch", "thu");
    // const docFri = doc(db, "lunch", "fri");


    // getDoc(docMonday).then((snapshot) => {
    //     setMenuMon(snapshot.data(), snapshot.id)
    // })
    // console.log(menuMon)

    // getDoc(docTue).then((snapshot) => {
    //     setMenuTue(snapshot.data(), snapshot.id)
    // })

    // getDoc(docWed).then((snapshot) => {
    //     setMenuWed(snapshot.data(), snapshot.id)
    // })

    // getDoc(docThu).then((snapshot) => {
    //     setMenuThu(snapshot.data(), snapshot.id)
    // })

    // getDoc(docFri).then((snapshot) => {
    //     setMenuFri(snapshot.data(), snapshot.id)
    // })
    
    // useEffect(() => {
    //     const fetchMon = onSnapshot(docMonday, snapshot => {            
    //         setMenuMon(snapshot.data(), snapshot.id) 
    //     }) 
    //      return () => {
    //         fetchMon();
    //      }
    // }, []);


    // useEffect(() => {
    //     function fetchTue() {
    //         const docTue = doc(db, "lunch", "tue");
    //         getDoc(docTue).then((snapshot) => {
    //         setMenuTue(snapshot.data(), snapshot.id) 
    //     })
    //      return () => {
    //         fetchTue();
    //      }
    // }}, []);


    useEffect(() => {
        const fetchMenu = onSnapshot(menuCollection, snapshot => {
            setMenu(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        } )
        return () => {
            fetchMenu()
        }
    }, []);
    // console.log(menu)


    // function fetchMenu() {
    //     const menuCollection = collection(db, 'lunch')
    //     getDocs(menuCollection)
    //         .then((snapshot) => {
    //             snapshot.docs.forEach((doc) => {
    //                 setMenu((prev)=>{
    //                     return[...prev, doc.data()]
    //                 })
    //             })})
    //             console.log(menu)
                  
    // }

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
            <div class="sub-nav">
                <h2>Dashboard</h2>
            </div>
            <h1>LUNCH MENU</h1>
            <div className="updateTime">
                {menu.map(menu =>((menu.id === 'updateTime') &&<div>Next update: {menu.data.updateDate.toDate().toDateString()}</div>))}
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
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'tue') &&<div> {menu.data.main[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'tue') &&<div> {menu.data.main[1]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'wed') &&<div> {menu.data.main[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'wed') &&<div> {menu.data.main[1]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'thu') &&<div> {menu.data.main[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'thu') &&<div> {menu.data.main[1]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'fri') &&<div> {menu.data.main[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'fri') &&<div> {menu.data.main[1]}</div>) )}
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
                            <br></br>
                            {menu.map(menu =>((menu.id === 'mon') &&<div> {menu.data.soup[1]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'tue') &&<div> {menu.data.soup[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'tue') &&<div> {menu.data.soup[1]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'wed') &&<div> {menu.data.soup[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'wed') &&<div> {menu.data.soup[1]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'thu') &&<div> {menu.data.soup[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'thu') &&<div> {menu.data.soup[1]}</div>) )}
                        </th>
                        <th>
                            {menu.map(menu =>((menu.id === 'fri') &&<div> {menu.data.soup[0]}</div>))}
                            <br></br>
                            {menu.map(menu =>((menu.id === 'fri') &&<div> {menu.data.soup[1]}</div>) )}
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

                    {/* <th>
                        <tr>Main</tr>
                        <tr>Side</tr>
                        <tr>Soup</tr>
                        <tr>Dessert</tr>
                    </th>
                    {menu.map((menu) => {
                        return ( 
                            ((menu.id === 'mon') && 
                            <th>
                                <tr>{menu.data.main[0]}</tr>
                                <tr>{menu.data.side}</tr>
                                <tr>{menu.data.soup}</tr>
                                <tr>{menu.data.dessert}</tr>
                            </th>           
                            ))
                    })}
                    {menu.map((menu) => {
                        return ( 
                            ((menu.id === 'tue') && 
                            <th>
                                <tr>{menu.data.main[0]}</tr>
                                <tr>{menu.data.side}</tr>
                                <tr>{menu.data.soup}</tr>
                                <tr>{menu.data.dessert}</tr>
                            </th>           
                            ))
                    })}
                    {menu.map((menu) => {
                        return ( 
                            ((menu.id === 'wed') && 
                            <th>
                                <tr>{menu.data.main[0]}</tr>
                                <tr>{menu.data.side}</tr>
                                <tr>{menu.data.soup}</tr>
                                <tr>{menu.data.dessert}</tr>
                            </th>           
                            ))
                    })}
                    {menu.map((menu) => {
                        return ( 
                            ((menu.id === 'thu') && 
                            <th>
                                <tr>{menu.data.main[0]}</tr>
                                <tr>{menu.data.side}</tr>
                                <tr>{menu.data.soup}</tr>
                                <tr>{menu.data.dessert}</tr>
                            </th>           
                            ))
                    })}
                    {menu.map((menu) => {
                        return ( 
                            ((menu.id === 'fri') && 
                            <th>
                                <tr>{menu.data.main[0]}</tr>
                                <tr>{menu.data.side}</tr>
                                <tr>{menu.data.soup}</tr>
                                <tr>{menu.data.dessert[0]}</tr>
                            </th>           
                            ))
                    })}
                     */}
                </tbody>
            </table>
            </div>
            <button className="normalBtn" onClick={updateMenu} >
                Update
            </button>
            </Sidebar>
        </>
        
    );
}
