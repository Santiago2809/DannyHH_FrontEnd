import { createSlice } from '@reduxjs/toolkit';

export const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        clients: [],
        activeCustomer: {}
    },
    reducers: {
        setClients: (state, { payload }) => {
            state.clients = payload;
        },
        addClients: (state, { payload }) => {
            state.clients.push(payload);
        },
        delClients: (state, { payload }) => {
            state.clients = state.clients.filter(client => client.id != payload);
        },
        editClients: (state, { payload }) => {
            state.clients = state.clients.map( client => {
                const edVal = payload.finalValues;
                if(client.id === payload.id) {
                    return {...client, ...edVal}
                } else {
                    return client
                }
            })
        },
        setActiveCustomer: (state, { payload }) => {
            state.activeCustomer = state.clients.find(customer => customer.id == payload);
        },
        delActiveCustomer: (state) => {
            state.activeCustomer = {};
        },
        clientLogout: (state) => {
            state.clients = [];
        }
    },
})

// Action creators are generated for each case reducer function
export const { setClients, addClients, delClients,editClients, setActiveCustomer, delActiveCustomer, clientLogout } = clientsSlice.actions;