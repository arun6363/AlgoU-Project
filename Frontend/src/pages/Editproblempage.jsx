import React from 'react'
import Editproblem from '../components/Editproblem'
import { useParams } from 'react-router'

export default function Editproblempage() {

  const {id} = useParams();
  return (
    <div>
        <Editproblem id={id}/>
    </div>
  )
}
