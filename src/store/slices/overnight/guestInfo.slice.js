// import {createSlice} from '@reduxjs/toolkit'

// const initialState= {}

// const guestInfo = createSlice({name:"guestInfo",initialState,reducers:{
//     insert(state,action){return {...state,...action.payload}}
// }})

// export const {insert} = guestInfo.actions
// export default guestInfo.reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const guestInfo = createSlice({
  name: "overnightGuestDetails",
  initialState,
  reducers: {
    insert(state, action) {
      return action.payload;
    },
    reset() {
      return initialState;
    },
    updateGuest(state, action) {
      const { id, field, value } = action.payload;
      const guestIndex = state.findIndex((guest) => guest.id === id);
      if (guestIndex >= 0) {
        state[guestIndex][field] = value;
      }
    },
  },
});

export const { insert, updateGuest, reset } = guestInfo.actions;
export default guestInfo.reducer;
