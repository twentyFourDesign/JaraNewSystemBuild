import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const guestCount = createSlice({
  name: "guestCount",
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

export const { insert, reset } = guestCount.actions;

export default guestCount.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = { guestCount: 0 };

// const guestCount = createSlice({
//   name: "guestCount",
//   initialState,
//   reducers: {
//     insert(state, action) {
//       state.guestCount = action.payload;
//     },
//   },
// });

// export const { insert } = guestCount.actions;

// export default guestCount.reducer;
