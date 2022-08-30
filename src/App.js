import React from 'react';
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
import ViewDetail from './components/ViewDetail/index';
import CreateSurvey from './components/SurveyCreate/index';
import ViewSurvey from './components/SurveyView/index'
import SuggestionDetail from './components/SuggestionDetail/index';
// import ViewSurvey from './components/SurveyDetail/index';



function App() {

  return (
    <AuthContextProvider>
      {/* <Navbar information={information} /> */}
      <div style={{ minHeight: "69vh" }}>
        <Routes>
            <Route path='/surveyView/:id' element={<ViewSurvey/>}/>
            <Route path='/suggest/:id' element={<SuggestionDetail/>}/>
            <Route path='/view/:id' element={<ViewDetail/>}/>
            {/* <Route path='/' element={<Menu />}/> */}
            <Route path='/menu' element={<Menu />}/>
            <Route path='/user' element={<User />}/>
            <Route path='/surveyCreate' element={<CreateSurvey />}/>
            {/* <Route path='/surveyView' element={<ViewSurvey />}/> */}
            <Route path='/user' element={<User />}/>
            <Route path='/!' element={<Report />}/>
            <Route path='/report' element={<Report />}/>
            <Route path='/!' element={<Suggestion />}/>
            <Route path='/suggestion' element={<Suggestion />}/>
            <Route path='/!' element={<Survey />}/>
            <Route path='/survey' element={<Survey />}/>
            <Route path='/' element={<SignIn />}/>


        </Routes>

      </div>

      </AuthContextProvider>

      
  );
}

export default App;
