import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "lastLogged",
  initialState: {
    value: "1688074456358",
  },
  reducers: {
    updateLoggedIn: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateLoggedIn } = loginSlice.actions;

export default loginSlice.reducer;
