import React from 'react'
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"


import Landingpage from '../pages/Landingpage'
import Login from '../components/Login'
import Register from '../components/Register'
import Updatepassword from '../components/Updatepassword'
import Compilerpage from '../pages/Compilerpage'
import Compiler from '../components/Compiler'
import Homepage from '../pages/Homepage'
import Problemspage from '../pages/Problemspage'
import Profilepage from '../pages/Profilepage'
import Problempage from '../components/Problempage'
import { useSelector } from 'react-redux'


export default function AppRoutes() {

  const {isLogedin} = useSelector((state)=>state.user);
  return (
    <BrowserRouter>
        <Routes>

            {console.log(isLogedin)}
            <Route path="/" element={isLogedin ? <Homepage/> : <Landingpage/>} />
            <Route path="/login" element ={<Login/>} />
            <Route path="/register" element ={<Register/>} />
            <Route path="/updatepassword" element ={<Updatepassword/>} />
            <Route path="/online-compiler" element ={<Compiler/>} />
            <Route path="/compiler" element ={<Compiler/>} />
            <Route path="/problems" element ={<Problemspage/>} />
            <Route path="/userprofile" element ={<Profilepage/>} />
            <Route path="/problems/problem" element ={<Problempage/>} />
        </Routes>

    </BrowserRouter>
  )
}
