import { createSlice } from '@reduxjs/toolkit'

const initialState={
    email:'',
    password:'',
    username:'',
    newpassword:'',
    confirmpassword:'',
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setEmail:(state,action)=>{
            state.email = action.payload;
        },
        setUsername:(state,action)=>{
            state.username = action.payload;
        },
        setPassword:(state,action)=>{
            state.password = action.payload;
        },
        setNewPassword:(state,action)=>{
            state.newpassword = action.payload;
        },
        setConfirmPassword:(state,action)=>{
            state.confirmpassword= action.payload;
        },
        resetAuth:()=>({...initialState}),
    }
})

export const { setConfirmPassword,setEmail,setNewPassword,setPassword,setUsername,resetAuth} = authSlice.actions;
export default authSlice.reducer; 