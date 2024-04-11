import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const guestCount = createSlice({
    name:"guestCount",
    initialState,
    reducers:{
        insert(state,action){
            return {...state, ...action.payload};
        },
    }
})

export const {insert} = guestCount.actions

export default guestCount.reducer