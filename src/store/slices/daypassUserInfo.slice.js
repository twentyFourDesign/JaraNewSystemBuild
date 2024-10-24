import { createSlice } from "@reduxjs/toolkit";

let initialState = {};

const daypassUserInfo = createSlice({
  name: "daypassUserInfo",
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

export const { insert, reset } = daypassUserInfo.actions;

export default daypassUserInfo.reducer;
