import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import modulesReducer from "./Courses/Modules/reducer";

const store = configureStore({
  reducer: {
    accountReducer,
    assignmentReducer,
    modulesReducer,
  },
});

export default store;
