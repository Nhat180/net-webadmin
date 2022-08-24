import React, { useState, useEffect, View, Image , useRef} from "react";
import "../ViewDetail/ViewDetail.css";
import{ db } from "../../firebase";
import { doc, getDoc, collection, addDoc, updateDoc} from "firebase/firestore";
import Sidebar from '../Sidebar.jsx'
import { onSnapshot } from "firebase/firestore";
// import "../../Sidebar.css"
import axios from 'axios';
import Pagination from '../Pagination'
import { useParams, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import SubNav from '../SubNav'
import Comment from "../Comment";
import { async } from "@firebase/util";

export default function SuggestionDetail() {

    const [user, setUser] = useState({});
    const [comments, setComment] = useState([]);
    const { id } = useParams();
    const commentCollection = collection(db, "suggestions", id, "comments")
    const [imgUrls, setIMGUrls] = useState([{url: ""}]);
    const docRef = doc(db, "suggestions", id) 
    const commentsRef = useRef(null);


    useEffect(() => {
         const fetchDocById = async () => {
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
               
               setUser({
                  ...docSnap.data()
            })
            ;
            } else {
               setUser({});
            }
      }
         fetchDocById()
   }, [id]);
   // console.log("imgUrls", imgUrls);
   

   useEffect(() => {
      const fetchComment = onSnapshot(commentCollection, snapshot => {
         setComment(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
      } )
      return () => {
          fetchComment()
      }
  }, []);

   const addCmt = async () => {
      if(commentsRef.current && commentsRef.current.value) {
         let updatedComments = comments
         await addDoc(commentCollection, {
            creator: "admin",
            imgUr: "",
            text: commentsRef.current.value,
            type: "text"
      })
         setComment([...comments], updatedComments)
         updateDoc(docRef, {
            totalCom: user.totalCom + 1
         })
         

      ;
      }
      const fetchDocById = async () => {
         const docSnap = await getDoc(docRef)

         if (docSnap.exists()) {
            
            setUser({
               ...docSnap.data()
         })
           
         ;
         } else {
            setUser({});
         }
   }
      fetchDocById()
      const fetchComment = onSnapshot(commentCollection, snapshot => {
         setComment(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
      } )
      return () => {
          fetchComment()
      }
   }

      const updateStatus = async (e) => {
         updateDoc(docRef, {
            status: `${e.target.value}`
         })

         const fetchDocById = async () => {
            const docSnap = await getDoc(docRef)
   
            if (docSnap.exists()) {
               
               setUser({
                  ...docSnap.data()
            })
              
            ;
            } else {
               setUser({});
            }
      }
         fetchDocById()
      }

      console.log("user", user);


      return (
        <>
         <Sidebar>
         <div>
            <SubNav content = {"Suggestion Detail"} />
         <div className="container">
           
            <h1>{user.title}</h1>
            <hr />
            <div className="info">
               <p>Creator: {user.creator}</p>
               <p>Creation Date: {user.dateCreate}</p>
            </div>
            <div className="info">
               <p>Type: {user.type}</p>
               <div className="change-status">
               <p>Status: </p>
               <select className="dropdown-detail" name="colValue" onChange={updateStatus}>
                        <option value={user.status}>{user.status}</option>
                        <option value="pending" >Pending  </option >
                        <option value="process">Process</option>
                        <option value="solved">Solved</option>
               </select>
               </div>
            </div>

            <br/>
             <hr />

            <h4>Suggestion Description</h4>
            {/* <hr /> */}
            <p>{user.description}</p>
            <img src={user.imgUrls}  width="200" height="200"></img>
            {/* <img src={user.imgUrls}  width="200" height="200"></img>  */}
            {/* { user.map(image => (user.imgUrls.map((url) => (<img src={url}> </img>)))) }
            {/* { user.imgUrls.map((url) => (<img src={url}> </img>)) } */}

            {/* <p>{user.imgUrls.length}</p> */}
            {/* {user && user.imgUrls.length > 0 && user.imgUrls.map((url) => (<img src={url}> </img>))} */}
            {/* { getDownLoadURL(user.imgUrls).map((url) => (<img src={url}> </img>)) }             */}
         </div>
  <br />
  <div className="container">
  <hr />
     <h4>Comments</h4>
     
     <br />
  </div>
   <div className="container">
      <div className="row justify-content-start">
         <div className="col xl-2 lg-2 md-3 sm-4 xs-4">
            <textarea 
                 className="form-control"
                 placeholder="Leave a comment here"
                 ref={commentsRef}
                 >
            </textarea>
          </div>
          <div className="col xl-1 lg-1 md-1 sm-2 xs-2">
             <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={addCmt}
                >
                    Post comment
             </button>
         </div>
         <div className="col xl-10 lg-10 md-10 sm-6 xs-6"></div>
      </div>
   </div>

   <br />
{ 
    comments && 
    comments.length> 0 &&  
    comments.map((comment, index) => 
          <Comment 
             key={index} 
             name={comment.data.creator} 
             type={comment.data.type}
             description={comment.data.text}
             img={comment.data.imgUrl} 
          />
    )}
    

   
            </div>
         </Sidebar>
        </>
      )
}