import React, { useState, useEffect } from "react";
import "./user.css";
import{ db } from "../../firebase";
import { doc, getDoc, collection, setDoc} from "firebase/firestore";
import Sidebar from '../Sidebar.jsx'
import { onSnapshot } from "firebase/firestore";
import SubNav from '../SubNav'
import "../../Sidebar.css"

export default function User() {

    const userCollection = collection(db, 'users');
    const [user, setUser] = useState([]);


    useEffect(() => {
        const fetchUser = onSnapshot(userCollection, snapshot => {
            setUser(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        } )
        return () => {
            fetchUser()
        }
    }, []);

    async function promote(email) {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        const isAdmin = docSnap.get("isAdmin");

        await setDoc(docRef, {isAdmin: true, username: email})
        return (alert("User " + email + " promoted successfully"))        
    }
    
    async function demote(email) {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        const isAdmin = docSnap.get("isAdmin");

        await setDoc(docRef, {isAdmin: false, username: email})
        return (alert("User " + email + " demoted successfully"))    
    }

    function btnDisplay(email, state){
        if(state == true){
            return(
                <button onClick={()=>demote(email)}> Demote </button>
            )
        } else{
            return(
                <button onClickCapture={()=>promote(email)}> Promote</button>
            )
        }
    }


    return (
        <>
        <Sidebar>
        
        <SubNav content = {"User"} />
        <h1>User Management</h1>  
        <div className="table-app">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th></th>
                        <th style={{textAlign: "center"}}>Username</th>
                        <th style={{textAlign: "center"}}>Role</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>   
                </thead>
                <tbody>
                    {user.map((id, index) =>{
                        return (
                            <tr key={id}>
                                <th scope="row">{index +1}</th>
                                <td>{id.data.username}</td>
                                <td>{id.data.isAdmin ? 'Admin' :'User' }</td>  
                                <td>{btnDisplay(id.data.username, id.data.isAdmin)}</td> 
                                {/* <button className="temp" onClick={toggleDisplay}>
                                    {unit}
                                </button>     */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        
        </Sidebar>
        </> 
    );
}
