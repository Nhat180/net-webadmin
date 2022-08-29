import React, { useState, useEffect, View, Image , useRef} from "react";
import "./ViewDetail.css";
import{ db } from "../../firebase";
import { doc, getDoc, collection, addDoc, updateDoc,setDoc, connectFirestoreEmulator} from "firebase/firestore";
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

export default function ViewDetail() {

    const [user, setUser] = useState({});
    const [comments, setComment] = useState([]);
    const { id } = useParams();
    const commentCollection = collection(db, "reports", id, "comments")
    const [imgUrls, setIMGUrls] = useState([{url: ""}]);
    const docRef = doc(db, "reports", id) 
    const commentsRef = useRef(null);
    

    useEffect(() => {
         const fetchDocById = async () => {
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
               setUser({
                  ...docSnap.data()
            })
               
            } else {
               setUser({});
            }
         }
         fetchDocById()
   }, [id]);
   
      console.log('user', user)
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
         let foo = 0;
         const checkTotalCmt = async () => {
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
               
               setUser({
                  ...docSnap.data()
                  
            })
            } else {
               setUser({});
            }}
         checkTotalCmt()
         var new_cmt_id=''
         if (user.totalCom == 0) {
            new_cmt_id = '00'
         } else if(user.totalCom > 0 && user.totalCom < 10) {
            foo = user.totalCom
            new_cmt_id="0"+foo
         }
         else {
            foo = user.totalCom ;
            new_cmt_id=foo.toString()
         }

         console.log("new_cmt",foo)
         console.log("type", typeof new_cmt_id)
         await setDoc(doc(db, "reports", id, "comments",new_cmt_id), {
            creator: "admin",
            imgUrl: "",
            text: commentsRef.current.value,
            type: "text"
         })
         updateDoc(docRef, {
            totalCom: user.totalCom + 1
         })
         
      }
      const fetchDocById = async () => {
         const docSnap = await getDoc(docRef)
         if (docSnap.exists()) {
            setUser({
               ...docSnap.data()
         })
            
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



      return (
        <>
         <Sidebar>
         <div>
            <SubNav content = {"Report Detail"} />
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

            <h4>Report Description</h4>
            {/* <hr /> */}
            <p>{user.description}</p>
            <div className ="imgSlide">
               { user.imgUrls?.map((url) =>
               (<img src={url} width="200" height="200"/>)) 
               }
            </div>
           
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