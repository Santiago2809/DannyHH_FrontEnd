
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
        setActiveEvent: ( state, { payload } ) => {
            state.activeEvent = payload;
        },
        delActiveEvent: (state) => {
            state.activeEvent = {};
        }
    },
})

// Action creators are generated for each case reducer function
export const { setActiveEvent, delActiveEvent, setEvents } = calendarSlice.actions;