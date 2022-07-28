import React, { useState, useEffect } from "react";
import SubNav from "../SubNav";
import "./menu.css";
import { Spinner } from "react-bootstrap";
import{ db } from "./../../firebase";
import { collection} from "firebase/firestore";
import { SignIn } from "../SignIn/index";
import { UserAuth } from "../../context/AuthContext";
import { onSnapshot } from "firebase/firestore";

export default function Menu() {
    
    const [menu, setMenu] = useState([]);    const [report, setReport] = useState([]);

    const api ="https://netcompany-crawl-server.herokuapp.com/menu";
    const {email, password} = SignIn();
    const menuCollection = collection(db, 'lunch')


    useEffect(() => {
        const fetchMenu = onSnapshot(menuCollection, snapshot => {
            setMenu(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        } )
        return () => {
            fetchMenu()
        }
    }, []);

    

    useEffect(() => {
        console.log(menu)
    }, [menu]);
    

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

    // const updateMenu = async () => {
    //     const response = await fetch(api, {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //             "username": email,
    //             "password": password
    //           })
    //     })
    
    //     if( response.status === 500 || response.status === 200){
    //         await fetchMenu()
    //       } else {
    //         console.log('Disconnection')
    //       }
    // }
    
    return (
        <>  
            <SubNav content="Menu"></SubNav>
            <h1>LUNCH MENU</h1>
            <div className="App">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                    </tr>
                </thead>
                <tbody>
                    <th>
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
                    
                </tbody>
            </table>
            </div>
            {/* <button className="normalBtn" onClick={updateMenu} >
                Update
            </button> */}
        </>
    );
}
