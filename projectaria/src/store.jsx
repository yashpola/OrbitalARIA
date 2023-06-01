import { configureStore } from "@reduxjs/toolkit";
import adminAccessReducer from "./components/adminAccessSlice";

export default configureStore({
  reducer: {
    adminAccess: adminAccessReducer,
  },
});
