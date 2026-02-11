import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    id:"",
    title:"",
    statement:"",
    difficulty:"Easy",
    timelimit:1,
    input:"",
    output:"",
    constraints:"",
    tags:"",
}

const problemSlice = new createSlice({
    name:"problem",
    initialState,
    reducers:{
        setId:(state,action)=>{
            state.id = action.payload;
        },
        setTitle:(state,action)=>{
            state.title = action.payload;
        },
        setStatement:(state,action)=>{
            state.statement = action.payload;
        },
        setTimelimit:(state,action)=>{
            state.timelimit = action.payload;
        },
        setDifficulty:(state,action)=>{
            state.difficulty = action.payload;
        },
        setInput:(state,action)=>{
            state.input = action.payload;
        },
        setOutput:(state,action)=>{
            state.output = action.payload;
        },
        setConstraints:(state,action)=>{
            state.constraints = action.payload;
        },
        setTags:(state,action)=>{
            state.tags = action.payload;
        },
        resetproblem:()=>initialState,
    }
})

export const {setConstraints,setId,setInput,setOutput,setTags,setTitle,setStatement,resetproblem,setDifficulty,setTimelimit} = problemSlice.actions
export default problemSlice.reducer;