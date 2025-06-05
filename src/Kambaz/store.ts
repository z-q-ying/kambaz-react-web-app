import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import modulesReducer from "./Courses/Modules/reducer";
import coursesReducer from "./Courses/reducer";

const store = configureStore({
  reducer: {
    accountReducer,
    assignmentReducer,
    coursesReducer,
    modulesReducer,
  },
});

export default store;
