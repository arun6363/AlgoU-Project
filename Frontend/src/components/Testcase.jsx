import React from 'react'
import TestcaseTile from './TestcaseTile'
import { useState } from 'react';
import "../styles/testcases.css"

export default function Testcase(props) {
    const cases = props.cases;
    // console.log(cases,props.testcases);
    const [idx, setIdx] = useState(1)
    return (
        <div className='testcases'>

            {

                cases.map((problem, index) => (
                    <TestcaseTile key={index + 1} id={index + 1} input={problem.input} output={problem.output} />
                ))
            }


        </div>
        // <TestcaseTile/>
    )
}