import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
    },
    reducers: {
        onLogin: ( state ) => {
            state.isAuth = true;
        },
        onLogOut: ( state ) => {
            state.isAuth = false;
        }
    }
})

export const { onLogin, onLogOut } = authSlice.actions;