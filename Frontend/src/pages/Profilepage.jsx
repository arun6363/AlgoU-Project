import React from 'react'
import Userprofile_user from '../components/Userprofile_user'
import UserProfile_admin from '../components/UserProfile_admin'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

export default function Profilepage() {

  const username = localStorage.getItem("username")
  console.log(username)
  const navigate = useNavigate();

  useEffect(()=>{
     if(!username){
            navigate("/")
      }
  })

  return (
        <>
        {console.log("profile page",username)}

          {username && (username === "admin" ? <UserProfile_admin/> : <Userprofile_user/> )}
        {/* <UserProfile_2/> */}
        </>
  )
}
