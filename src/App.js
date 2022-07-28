import React from 'react';
import { useState } from "react";
import { SignIn } from "./components/SignIn";
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import FooterComponent from "./components/FooterComponent";
import {  Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar1";
import Menu from './components/Menu/index';
// import Management from "./components/Management";



function App() {

  const [information, setInformation] = useState(
    JSON.parse(localStorage.getItem("information"))
        ? JSON.parse(localStorage.getItem("information"))
        : ""
  );

  return (
    <AuthContextProvider>
      <Navbar information={information} />
      <div style={{ minHeight: "69vh" }}>
        <Routes>
            {/* <Route path='/' element={<SignIn/>} /> */}
            <Route path='/' element={<Menu />}/>
            {/* <Route path="/" element={<Management></Management>} /> */}
        </Routes>
        </div>

          </AuthContextProvider>

      
  );
}

export default App;
