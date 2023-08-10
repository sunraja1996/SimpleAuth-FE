import React  from 'react'
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './component/login.js'
import Dashboard from './component/dashboard.js';
import Profile from './component/profile';
import Signup from './component/signup';
import ProductedRoute from './component/ProductedRoute';
import Adduser from './component/Adduser';
import UpdateUser from './component/UpdateUser';
import SocialProfile from './component/SocialProfile';


function App() {


  return (
    

      <BrowserRouter>
      <Routes> 
        <Route path = "/login" element = {<Login/>}/>
        <Route path='/dashboard' element={<ProductedRoute><Dashboard /></ProductedRoute>} /> 
        <Route path='/profile' element={<ProductedRoute><Profile /></ProductedRoute>} />  
        <Route path = "/signup" element = {<Signup/>}/> 
        <Route path = "*" element = {<Navigate to='/login'/>}/> 
        <Route path = '/socialprofile' element={<SocialProfile/>}/>
        <Route path = "/adduser" element = {<Adduser/>}/> 
        <Route path = "/edituser" element = {<UpdateUser/>}/> 
      </Routes>
      </BrowserRouter>
      


    
  );
}

export default App;
