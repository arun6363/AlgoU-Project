import { createSlice } from '@reduxjs/toolkit'
// import SolvedProblem from '../../../Backend/models/solvedProblems';

const initialState={
   SolvedProblems:[],
}

const solvedProblemSlice = createSlice({
    name:'solvedproblem',
    initialState,
    reducers:{
        setSolvedproblems:(state,action)=>{
            state.SolvedProblems = action.payload;
        },
        
        resetSolvedProblem:()=>({...initialState}),
    }
})

export const {setSolvedproblems,resetSolvedProblem } = solvedProblemSlice.actions;
export default solvedProblemSlice.reducer; 