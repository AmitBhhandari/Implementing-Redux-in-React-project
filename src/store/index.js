
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter-slice";
import AuthReducer from "./auth-slice";





const store = configureStore({ 
  reducer:{counter: counterReducer,auth:AuthReducer} 
});


export default store;
