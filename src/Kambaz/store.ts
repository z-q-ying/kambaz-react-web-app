import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer";
import modulesReducer from "./Courses/Modules/reducer";

const store = configureStore({
  reducer: {
    accountReducer,
    modulesReducer,
  },
});

export default store;
