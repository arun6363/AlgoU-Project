import React from 'react'
import "../styles/TestcaseTile.css"

export default function TestcaseTile(props) {
    // console.log(props.id)

  
  return (
    <div className='testcase'>
         <div className="fields">
            <span>{`case ${props.id}`}</span>
        </div>
        <label htmlFor="" className='fields'>arr = </label>
        <div style={{ whiteSpace: "pre-line" }} className='input'>{props.input}</div>
        {/* <input type="text" style={{ whiteSpace: "pre-line" }} className="fields"value={props.input} onChange={handlechange}/> */}
        <label htmlFor="" className='fields'>output</label>
        <div style={{ whiteSpace: "pre-line" }} className='input'>{props.output}</div>
        {/* <input type="text" className='fields' value={props.output} onChange={handlechange}/> */}
    </div>
  )
}