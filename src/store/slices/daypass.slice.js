import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const daypassBookingInfo = createSlice({
  name: "daypassBookingInfo",
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

export const { insert, reset } = daypassBookingInfo.actions;

export default daypassBookingInfo.reducer;
