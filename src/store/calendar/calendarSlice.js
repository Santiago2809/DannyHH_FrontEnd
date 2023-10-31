
import { createSlice } from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [],
        activeEvent: {},
        ocasionalDates: []
    },
    reducers: {
        setEvents: (state, { payload }) => {
            state.events = payload
        },
        delEvents: (state) => {
            state.events = []
        },
        setOcasional: (state, { payload }) => {
            state.ocasionalDates = payload
        },
        delOcasional: (state) => {
            state.ocasionalDates = []
        },
        setActiveEvent: (state, { payload }) => {
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
export const { setActiveEvent, delEvents, setOcasional, delOcasional, delActiveEvent, setEvents, calendarLogout } = calendarSlice.actions;