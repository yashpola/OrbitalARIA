import { configureStore } from "@reduxjs/toolkit";
import studySessionReducer from "./components/StudySessionPage/studySessionSlice.jsx";

export default configureStore({
  reducer: {
    timer: studySessionReducer,
  },
});
