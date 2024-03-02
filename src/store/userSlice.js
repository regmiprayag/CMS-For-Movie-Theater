import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"


const initialState = {
    isLoggedIn: false,
    value: {}
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        login(state){
            state.isLoggedIn = true
        },
        logout(state){
            localStorage.removeItem("adminId")
            localStorage.removeItem("adminToken")
            state.isLoggedIn = false
        },
    },
})

export const userActions = userSlice.actions

export const store = configureStore({
    reducer:{
        user: userSlice.reducer,
    }
})

const logoutAfterTwoMinutes = () => {
    setTimeout(() => {
        store.dispatch(userActions.logout()); // Dispatch the logout action
    }, 20 * 60 * 1000); // 20 minutes in milliseconds
}

// Call the function when the user logs in
store.subscribe(() => {
    const isLoggedIn = store.getState().user.isLoggedIn;
    if (isLoggedIn) {
        logoutAfterTwoMinutes();
    }
});