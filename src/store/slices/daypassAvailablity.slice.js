import { createSlice } from "@reduxjs/toolkit"

let initialState= {}


const daypassAvailablity = createSlice({
    name:"daypassAvailablity",
    initialState,
    reducers:{
        insert(state,action){
            return {...state,...action.payload}
        }
    }
})


export const {insert}  = daypassAvailablity.actions

export default daypassAvailablity.reducer