import { configureStore } from '@reduxjs/toolkit'

import authReducer from "./authSlice"
import codeAreaReducer from "./codeAreaSlice"
import userReducer from "./userSlice"
import problemReducer from "./problemSlice"
import solvedProblemReducer from "./solvedProblemSlice"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    codeArea:codeAreaReducer,
    user:userReducer,
    problem:problemReducer,
    solvedproblem :solvedProblemReducer,
  },
})