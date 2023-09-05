import { createSlice } from '@reduxjs/toolkit';

export const clientsSlice = createSlice({
    name: 'clients',
    initialState:{
        clients: [], 
    },
    reducers: {
        setClients: ( state, { payload } ) => {
            state.clients = payload;
        },
        addClients: ( state, { payload }) => {
            state.clients.push(payload);
        },
        delClients: ( state, { payload} ) => {
            state.clients = state.clients.filter( client => client.id != payload);
        }
    },
})

// Action creators are generated for each case reducer function
export const { setClients , addClients,delClients } = clientsSlice.actions;