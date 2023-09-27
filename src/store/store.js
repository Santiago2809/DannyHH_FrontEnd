import { configureStore } from "@reduxjs/toolkit";
import { authSlice, calendarSlice, clientsSlice, uiSlice } from "./";


export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        clients: clientsSlice.reducer,
        calendar: calendarSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})