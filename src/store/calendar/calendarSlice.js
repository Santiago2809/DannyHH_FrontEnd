
import { createSlice } from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState:{
        activeEvent: {}
    },
    reducers: {
        setActiveEvent: ( state, { payload } ) => {
            state.activeEvent = payload;
        },
        delActiveEvent: (state) => {
            state.activeEvent = {};
        }
    },
})

// Action creators are generated for each case reducer function
export const { setActiveEvent, delActiveEvent } = calendarSlice.actions;