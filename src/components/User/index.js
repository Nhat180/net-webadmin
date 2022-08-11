import React, { useState, useEffect } from "react";
import "./user.css";
import{ db } from "../../firebase";
import { doc, getDoc, collection, setDoc} from "firebase/firestore";
import Sidebar from '../Sidebar.jsx'
import { onSnapshot } from "firebase/firestore";
import "../../Sidebar.css"

export default function User() {

    const userCollection = collection(db, 'users')
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');


    useEffect(() => {
        const fetchUser = onSnapshot(userCollection, snapshot => {
            setUser(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        } )
        return () => {
            fetchUser()
        }
    }, []);

    async function promote(email) {
        if (email.toString() === "admin"){
            return -1
        }
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        if(!docSnap.exists()){
            return -2
        }
        const isAdmin = docSnap.get("isAdmin")
        if (isAdmin === true){
            return -3
        }

        await setDoc(docRef, {isAdmin: true, username: email})
        return 1        
    }
    
    async function demote(email) {
        if (email.toString() === "admin"){
            return -1
        }
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        if(!docSnap.exists()){
            return -2
        }
        const isAdmin = docSnap.get("isAdmin")
        if (isAdmin !== true){
            return -3
        }

        await setDoc(docRef, {isAdmin: true, username: email})
        return 1        
    }

    const [unit, setUnit] = useState("Promote");
    const toggleDisplay = () => {
        if (unit === "Promote") {
            setUnit("Demote");
            console.log(unit);
        } else {
            setUnit("Promote");
            console.log(unit);
        }
    };

    return (
        <>
        <Sidebar>
        <div class="sub-nav">
            <h2>User</h2>
        </div>
        <h1>User Management</h1>  
        <div className="App">
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
