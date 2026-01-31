import { configureStore } from '@reduxjs/toolkit'

import authReducer from "./authSlice"
import codeAreaReducer from "./codeAreaSlice"
import userReducer from "./userSlice"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    codeArea:codeAreaReducer,
    user:userReducer,
  },
})