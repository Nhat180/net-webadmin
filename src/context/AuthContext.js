import { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';
import { db } from '../firebase';
import {getDoc, doc} from 'firebase/firestore'
// import * as Uri from "postcss";
// import * as http from "http";

const UserContext = createContext();
const api = "https://netcompany-crawl-server.herokuapp.com/auth";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

   const signIn = async (email, password) => {
     if (email.toString() === "admin") {
       email += "@gmail.com"
       return signInWithEmailAndPassword(auth, email, password)
     }

     const response = await fetch(api, {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         "username": email,
         "password": password
       })
     })
     console.log(response)


     email += "@gmail.com"

     if(response.status === 500 || response.status === 200){
       await signInWithEmailAndPassword(auth, email, "123456")
     }else{
       await signInWithEmailAndPassword(auth, email, "wrongpass")
     }



     const docRef = doc(db, "users", email.substring(0, email.length - 10));
     console.log(docRef)
     const docSnap = await getDoc(docRef);
     console.log(docSnap)

     if(!docSnap.exists()){
       await signOut(auth)
       return signInWithEmailAndPassword(auth, email, "wrongpass")
     }
     const isAdmin = docSnap.get("isAdmin")
     console.log(isAdmin)
     if(isAdmin === false){
       await signOut(auth)
       return signInWithEmailAndPassword(auth, email, "wrongpass")
     }
     await signOut(auth)

     return signInWithEmailAndPassword(auth, email, "123456")

   }

  const logout = () => {
      return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{  user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};