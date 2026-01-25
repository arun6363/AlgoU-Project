import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"


import Landingpage from '../pages/Landingpage'
import Login from '../components/Login'
import Register from '../components/Register'
import Updatepassword from '../components/Updatepassword'

export default function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landingpage/>} />
            <Route path="/login" element ={<Login/>} />
            <Route path="/register" element ={<Register/>} />
            <Route path="/updatepassword" element ={<Updatepassword/>} />
        </Routes>

    </BrowserRouter>
  )
}
