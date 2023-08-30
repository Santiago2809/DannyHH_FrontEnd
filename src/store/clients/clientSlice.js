import { createSlice } from '@reduxjs/toolkit'
import { getClients } from '../../clients';

export const clientsSlice = createSlice({
    name: 'clients',
    initialState:{
        clients: [], 
    },
    reducers: {
        fetchClients: ( state ) => {
            state.clients = getClients() == null ? [] : getClients();
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
export const { fetchClients, addClients,delClients } = clientsSlice.actions;