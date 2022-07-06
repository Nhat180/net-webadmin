import React from 'react';
import { useState } from "react";
import { SignIn } from "./components/SignIn";
import Account from './components/Account';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import FooterComponent from "./components/FooterComponent";
import {  Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar1";



function App() {

  const [information, setInformation] = useState(
    JSON.parse(localStorage.getItem("information"))
        ? JSON.parse(localStorage.getItem("information"))
        : ""
  );

  return (
    <AuthContextProvider>
      <Navbar information={information} />
      


      <div>
        <Routes>
            <Route path='/' element={<SignIn/>} />
            <Route
              path='/account'
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
        </Routes>
        </div>

        <FooterComponent />
        </AuthContextProvider>

      
  );
}

export default App;
