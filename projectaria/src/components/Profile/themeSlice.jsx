import { createSlice } from "@reduxjs/toolkit";

const storedTheme = localStorage.getItem("storedTheme");

export const themeSlice = createSlice({
  name: "currentTheme",
  initialState: {
    value: storedTheme ?? "Navy",
  },
  reducers: {
    switchToDesert: (state) => {
      state.value = "Desert";
    },
    switchToNavy: (state) => {
      state.value = "Navy";
    },
    switchToNews: (state) => {
      state.value = "News";
    },
    switchToForest: (state) => {
      state.value = "Forest";
    },
  },
});

export const { switchToNavy, switchToDesert, switchToNews, switchToForest } =
  themeSlice.actions;

export default themeSlice.reducer;
