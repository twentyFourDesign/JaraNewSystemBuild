import { createSlice } from "@reduxjs/toolkit"

let initialState= {}


const daypassUserInfo = createSlice({
    name:"daypassUserInfo",
    initialState,
    reducers:{
        insert(state,action){
            return {...state,...action.payload}
        }
    }
})


export const {insert}  = daypassUserInfo.actions

export default daypassUserInfo.reducer