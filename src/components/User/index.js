import React, { useState, useEffect } from "react";
import "./user.css";
import{ db } from "../../firebase";
import { setDoc,doc, getDoc, collection,  query, where, orderBy, startAt} from "firebase/firestore";
import Sidebar from '../Sidebar.jsx'
import { onSnapshot } from "firebase/firestore";
import SubNav from '../SubNav'
// import "../../Sidebar.css"

export default function User() {

    const userCollection = collection(db, 'users');
    const [user, setUser] = useState([]);


    useEffect(() => {
        const fetchUser = onSnapshot(userCollection, snapshot => {
            setUser(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
        })
        return () => {
            fetchUser()
        }
    }, []);

    const sortUserRole = async (e) => {
        if (e.target.value == "all") {
            onSnapshot(userCollection, snapshot => {
                setUser(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else if (e.target.value == "user") {
            onSnapshot(query(collection(db,'users'), orderBy('isAdmin'), where('isAdmin','==', false)), snapshot => {
                setUser(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        } else {
            onSnapshot(query(collection(db,'users'), orderBy('isAdmin'), where('isAdmin','==', true)), snapshot => {
                setUser(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        }
    }

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
                <button class="button-2" role="button" onClick={()=>demote(email)}> Demote </button>
            )
        } else{
            return(
                <button class="button-3" role="button" onClickCapture={()=>promote(email)}> Promote</button>
            )
        }
    }


    const searchUser = async (e) => {
        if(e.target.value === null) {
            onSnapshot(userCollection, snapshot => {
                setUser(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            } )
        } else {

            setUser(user.filter(
                    (user) => 
                    user.data.username.toLowerCase().includes(e.target.value.toLowerCase())
                ));
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
                        <th style={{textAlign: "center"}}>Username
                        <div class="search">
                                <form  style={{ display: "inline" }}>
                                    <input
                                        type="text"
                                        className="inputField"
                                        placeholder="Search User"
                                        onChange={searchUser}
                                        
                                    />
                                </form>
                            </div>
                        </th>
                        <th style={{textAlign: "center"}}>Role
                            <select className="dropdown" name="colValue" onChange={sortUserRole}>
                                <option value="all">All</option>
                                <option value="user">User</option>
                                <option value="admin" >Admin</option >
                            </select>
                        </th>
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
