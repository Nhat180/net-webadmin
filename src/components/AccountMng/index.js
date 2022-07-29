import { useState, useEffect } from "react";
import { auth } from '../firebase';
import { db } from '../firebase';
import {getDoc, doc, setDoc} from 'firebase/firestore'

function AccountMng(){
    const [email, setEmail] = useState('');

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
}