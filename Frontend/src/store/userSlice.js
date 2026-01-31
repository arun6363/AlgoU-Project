import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem("jwt_token");

const initialState={
    email:'',
    username:'',
    isLogedin:!!token,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setEmail:(state,action)=>{
            state.email = action.payload;
        },
        setUsername:(state,action)=>{
            state.username = action.payload;
        },
        setLogin:(state,action)=>{
            state.isLogedin = action.payload;
        },
        logout:(state)=>{
            state.isLogedin = false;
            localStorage.removeItem("jwt_token");
        }
    }
})

export const { setEmail,setUsername,setLogin,logout} = userSlice.actions;
export default userSlice.reducer; 