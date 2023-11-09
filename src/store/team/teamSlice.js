import { createSlice } from '@reduxjs/toolkit'

export const teamSlice = createSlice({
    name: 'team',
    initialState:{
        members: [],
    },
    reducers: {
        setMembers: (state, { payload} ) => {
            state.members = payload;
        },
        addMember: (state, { payload }) => {
            state.members.push(payload);
        },
        editMember: (state, { payload }) => {
            state.members = state.members.map( member => {
                const edVal = payload.finalValues;
                if(member.id === payload.id) {
                    return {...member, ...edVal}
                } else {
                    return member
                }
            })
        },
        delMember: (state, { payload }) => {
            state.members = state.members.filter(member => member.id != payload);
        },
        membersLogout: (state) => {
            state.members = [];
        }
    },
})

// Action creators are generated for each case reducer function
export const { setMembers, addMember, delMember, editMember, membersLogout } = teamSlice.actions;