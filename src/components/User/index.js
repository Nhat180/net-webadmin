import React, { useState, useEffect } from "react";
import "./user.css";
import{ db } from "../../firebase";
import { setDoc,doc, getDoc, collection,  query, where, orderBy, startAt} from "firebase/firestore";
import Sidebar from '../Sidebar/index'
import { onSnapshot } from "firebase/firestore";
import SubNav from '../SubNav'
import Pagination from '../Pagination'
import { Link, useNavigate } from "react-router-dom";


export default function User() {

    const userCollection = collection(db, 'users');
    const [user, setUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(10);
    const navigate = useNavigate();

    // Get current 
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItem = user.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchUser = onSnapshot(query(collection(db,'users'), orderBy('isAdmin','desc')), snapshot => {
            setUser(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))})
        return () => {
            fetchUser()
        }
    }, []);

    const sortUserRole = async (e) => {
        if (e.target.value == "all") {
            onSnapshot(query(collection(db,'users'), orderBy('isAdmin','desc')), snapshot => {
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
                <button class="button-demote" role="button" onClick={()=>demote(email)}> Demote </button>
            )
        } else{
            return(
                <button class="button-promote" role="button" onClickCapture={()=>promote(email)}> Promote</button>
            )
        }
    }


    const searchUser = async (e) => {
        if(e.target.value === '') {
            return onSnapshot(userCollection, snapshot => {
                setUser(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            } )
        } else {
            return setUser(user.filter(
                    (user) => 
                    user.data.username.toLowerCase().includes(e.target.value.toLowerCase())))
        }        
    }

    const globalUserSearch = async (e) => {
        if(e.target.value === '') {
            return onSnapshot(userCollection, snapshot => {
                setUser(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
            } )
        } else {
            return setUser(user.filter(
                    (user) => 
                    user.data.username.toLowerCase().includes(e.target.value.toLowerCase()))) ||
                    user.data.isAdmin.toLowerCase().includes(e.target.value.toLowerCase())
        }        
    }
    
    return (
        <>
        <Sidebar>
        
        <SubNav content = {"User Management"} />
        {/* <h1>User Management</h1>   */}
        <div className="table-app">
            <div className="global-search">
                    <form  style={{ display: "inline", border:'solid', borderRadius:'8px',padding:'7px' }}>
                        <input
                            type="text"
                            className=""
                            placeholder="  Search All ..."
                            onChange={globalUserSearch}
                        />
                    </form>
                </div>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>ID</th>
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
                    {currentItem.map((id, index) =>{
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
            <div class ="pag">
                <Pagination
                    itemPerPage={itemPerPage}
                    totalItem={user.length}
                    paginate={paginate}
                    link = "/user/!#"
                />
            </div>
        </div> 
        </Sidebar>
        </> 
    );
}
