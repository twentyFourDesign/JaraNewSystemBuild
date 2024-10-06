import { createSlice } from "@reduxjs/toolkit";

let initialState = {};

const daypassAvailablity = createSlice({
  name: "daypassAvailablity",
  initialState,
  reducers: {
    insert(state, action) {
      return { ...state, ...action.payload };
    },
    reset() {
      return initialState;
    },
  },
});

export const { insert, reset } = daypassAvailablity.actions;

export default daypassAvailablity.reducer;
