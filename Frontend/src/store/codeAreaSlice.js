import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    filename:"Main.cpp",
    language:"cpp",
    code:`// Online C++ compiler to run C++ program online
#include <iostream> 
using namespace std;

int main() { 
    cout << "Welcome to Online Judges - online compiler -- C++!!!" << endl; 
                
    return 0; 
}
`,
    outputcode:"output goes here......",
    inputcode:""
}


export const codeSlice = createSlice({
    name:"codeArea",
    initialState,
    reducers:{
        setLanguage :(state,action)=>{
            state.language = action.payload;
        },
        setCode :(state,action)=>{
            state.code = action.payload;
        },
        setInputCode:(state,action)=>{
            state.inputcode = action.payload;
        },
        setOutputCode :(state,action)=>{
            state.outputcode = action.payload;
        },
        setFilename:(state,action)=>{
            state.filename = action.payload;
        },
        resetCodeArea:({...initialState}),

    }
}) 

export const {setCode,setLanguage,setInputCode,setOutputCode,setFilename,resetCodeArea} = codeSlice.actions;
export default codeSlice.reducer 