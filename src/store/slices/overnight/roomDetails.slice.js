import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const roomDetails = createSlice({
  name: "roomDetails",
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

export const { insert, reset } = roomDetails.actions;

export default roomDetails.reducer;
