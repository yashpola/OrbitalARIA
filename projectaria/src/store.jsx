import { configureStore } from "@reduxjs/toolkit";
import studySessionReducer from "./components/StudySessionPage/studySessionSlice.jsx";
import themeReducer from "./components/Profile/themeSlice.jsx";
import loginReducer from "./components/LoginPage/loginSlice.jsx";

export default configureStore({
  reducer: {
    timer: studySessionReducer,
    currentTheme: themeReducer,
    lastLogged: loginReducer,
  },
});
