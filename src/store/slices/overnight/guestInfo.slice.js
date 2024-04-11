import {createSlice} from '@reduxjs/toolkit'

const initialState= {}


const guestInfo = createSlice({name:"guestInfo",initialState,reducers:{
    insert(state,action){return {...state,...action.payload}}
}})


export const {insert} = guestInfo.actions
export default guestInfo.reducer