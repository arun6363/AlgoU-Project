import React from 'react'
import "../styles/verdict.css"

export default function verdict(props) {
  const result = props.result;
  if(!result) return null
  const passed_testcases = result.passed_testcases;
  return (

    
    result && (
    <div className='verdict'>
      <div className="verdict-top">
        <span>{`verdict: ${result.verdict}`}</span>
        <span>{`Testcases passed: ${result.passed}/${result.total_testcases}`}</span>
      </div>

      
      <div className='passed-testcases'>
        {passed_testcases &&
        (
          passed_testcases.map((testcase, index) => {
            console.log(testcase);
             return <span key={index} className='verdict_testcase'>{testcase}</span>
          })
        )
      }
      </div>


      
        {result.failedtestcase &&
        <div className="failedtestcase">
          <div>{`Failed Testcase: ${result.failedtestcase}`}</div>
          <label htmlFor="">input</label>
          <input type="text" value={result.input} readOnly />
          <label htmlFor="">output</label>
          <input type="text" value={result.output} readOnly />
          <label htmlFor="">Expected output</label>
          <input type="text" value={result.expectedoutput} readOnly />
        </div>
        }
      
    </div> ) 


    // <div className='verdict'>
    //   <div className="verdict-top">
    //     <span>{`verdict: ${result.verdict}`}</span>
    //     <span>{`Testcases passed: ${result.passed}/${result.total_testcases}`}</span>
    //   </div>

    //   {!result.failedtestcase &&
    //     (
    //       passed_testcases.map((testcase, index) => {
    //         <div key={index}>{testcase}</div>
    //       })
    //     )
    //   }


    //   {
    //     result.failedtestcase &&
    //     (
    //       <div className="failedtestcase">
    //         <div>{`Failed Testcase: ${result.failedtestcase}`}</div>
    //         <label htmlFor="">input</label>
    //         <input type="text" value={result.input} readOnly />
    //         <label htmlFor="">output</label>
    //         <input type="text" value={result.output} readOnly />
    //         <label htmlFor="">Expected output</label>
    //         <input type="text" value={result.expectedoutput} readOnly />
    //       </div>
    //     )
    //   }
    // </div>

  )
}
