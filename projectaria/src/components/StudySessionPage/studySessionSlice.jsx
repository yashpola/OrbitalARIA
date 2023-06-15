import { createSlice } from "@reduxjs/toolkit";

export const studySessionSlice = createSlice({
  name: "timer",
  initialState: {
    value: false,
  },
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = studySessionSlice.actions;

export default studySessionSlice.reducer;
