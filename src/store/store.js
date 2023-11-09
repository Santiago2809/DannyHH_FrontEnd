import { configureStore } from "@reduxjs/toolkit";
import { authSlice, calendarSlice, clientsSlice, teamSlice, uiSlice } from "./";


export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        clients: clientsSlice.reducer,
        calendar: calendarSlice.reducer,
        team: teamSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})