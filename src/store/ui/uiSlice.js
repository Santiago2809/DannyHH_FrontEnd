import { createSlice } from "@reduxjs/toolkit";


export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        loadingC: false,
        loadingT: false,

        isAddOpenCal: false,

        isAddOpenC: false,
        isEditOpenC: false,
        isDelOpenC: false,

        isAddOpenT: false,
        isEditOpenT: false,
        isDelOpenT: false,

        isOpenEvent: false,
    },
    reducers: {
        ///Loading customers
        onLoadC: (state) => {
            state.loadingC = true;
        },
        onLoadedC: (state) => {
            state.loadingC = false;
        },
        //* Loading team members
        onLoadT: (state) => {
            state.loadingT = true;
        },
        onLoadedT: (state) => {
            state.loadingT = false;
        },
        ////Calendar
        onAddOpenCal: (state) => {
            state.isAddOpenCal = true;
        },
        onAddCloseCal: (state) => {
            state.isAddOpenCal = false;
        },
        //// Customers
        onOpenAddC: (state) => {
            state.isAddOpenC = true;
        },
        onCloseAddC: (state) => {
            state.isAddOpenC = false;
        },
        onOpenEditC: (state) => {
            state.isEditOpenC = true;
        },
        onCloseEditC: (state) => {
            state.isEditOpenC = false;
        },
        onOpenDelC: (state) => {
            state.isDelOpenC = true;
        },
        onCloseDelC: (state) => {
            state.isDelOpenC = false;
        },
        //// Team members
        onOpenAddT: (state) => {
            state.isAddOpenT = true;
        },
        onCloseAddT: (state) => {
            state.isAddOpenT = false;
        },
        onOpenEditT: (state) => {
            state.isEditOpenT = true;
        },
        onCloseEditT: (state) => {
            state.isEditOpenT = false;
        },
        onOpenDelT: (state) => {
            state.isDelOpenT = true;
        },
        onCloseDelT: (state) => {
            state.isDelOpenT = false;
        },

        onOpenEvent: (state) => {
            state.isOpenEvent = true;
        },
        onCloseEvent: (state) => {
            state.isOpenEvent = false;
        }
    }
})

export const { onLoadC, onLoadedC, onLoadT, onLoadedT, onAddOpenCal, onAddCloseCal, onCloseAddC, onCloseDelC, onCloseEditC, onOpenAddC, onOpenDelC, onOpenEditC, onOpenAddT, onCloseAddT, onOpenEditT, onCloseEditT, onOpenDelT, onCloseDelT, onOpenEvent, onCloseEvent } = uiSlice.actions;