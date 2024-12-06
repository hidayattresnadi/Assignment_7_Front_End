import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/authSilce";


export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
