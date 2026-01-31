import React, { useEffect } from 'react'
import "../styles/problempage.css"

export default function Problempage() {

  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
  fetch(`/problems/${id}`)
    .then(res => res.json())
    .then(data => setProblem(data));
}, [id]);


  return (
    <div className='problempage'>
        <div className="problemarea">
            <div className="ptitle">Two Sum</div>
            <div className="pdesc">Find pair of integers whose sum is equal to K</div>
            <div className="ptags">sorting</div>
            <div className="pconstraints">{"1<= N <= 10^5"}</div>
            <div className="ptestcase"></div>
        </div>
        <div className="codearea">
            <div className="editor">

            </div>
            <div className="outputarea">

            </div>
        </div>
    </div>
  )
}
