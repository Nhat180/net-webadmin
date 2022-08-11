import React from 'react';
import { useState } from "react";
import { SignIn } from "./components/SignIn";
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import {  Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar1";
import Menu from './components/Menu/index';
import User from './components/User/index';
import Report from './components/Report/index';
import Suggestion from './components/Suggestion/index';
import Survey from './components/Survey/index';






function App() {

  const [information, setInformation] = useState(
    JSON.parse(localStorage.getItem("information"))
        ? JSON.parse(localStorage.getItem("information"))
        : ""
  );

  return (
    <AuthContextProvider>
      {/* <Navbar information={information} /> */}
      <div style={{ minHeight: "69vh" }}>
        <Routes>
            {/* <Route path='/' element={<SignIn/>} /> */}
            <Route path='/menu' element={<Menu />}/>
            <Route path='/user' element={<User />}/>
            <Route path='/!' element={<Report />}/>
            <Route path='/report' element={<Report />}/>
            <Route path='/!' element={<Suggestion />}/>
            <Route path='/suggestion' element={<Suggestion />}/>
            <Route path='/!' element={<Survey />}/>
            <Route path='/survey' element={<Survey />}/>
            <Route path='/' element={<SignIn />}/>

              {/* <Route path="/" element={<Management></Management>} /> */}
        </Routes>

      </div>

          </AuthContextProvider>

      
  );
}

export default App;
