
import { createSlice } from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState:{
        events: [],
        activeEvent: {}
    },
    reducers: {
        setEvents: (state, { payload } ) => {
            state.events = payload
        },
        delEvents: ( state ) => {
            state.events = []
        },
        setActiveEvent: ( state, { payload } ) => {
            state.activeEvent = payload;
        },
        delActiveEvent: (state) => {
            state.activeEvent = {};
        },
        calendarLogout: (state) => {
            state.events = [];
        }
    },
})

// Action creators are generated for each case reducer function
export const { setActiveEvent,delEvents, delActiveEvent, setEvents, calendarLogout } = calendarSlice.actions;