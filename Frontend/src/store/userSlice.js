import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem("jwt_token");

const initialState={
    email:'',
    username:'',
    isLogedin:!!token ? true : false,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        set_Email:(state,action)=>{
            state.email = action.payload;
        },
        set_Username:(state,action)=>{
            state.username = action.payload;
        },
        setLogin:(state,action)=>{
            state.isLogedin = action.payload;
        },
        logout:(state)=>{
            state.email="",
            state.username='',
            state.isLogedin = false;
            localStorage.clear();
        }
    }
})

export const { set_Email,set_Username,setLogin,logout} = userSlice.actions;
export default userSlice.reducer; 