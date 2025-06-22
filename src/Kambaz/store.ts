import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/Modules/reducer";
import questionsReducer from "./Courses/Quizzes/Questions/reducer";
import quizReducer from "./Courses/Quizzes/reducer";

const store = configureStore({
  reducer: {
    accountReducer,
    assignmentReducer,
    coursesReducer,
    modulesReducer,
    questionsReducer,
    quizReducer,
  },
});

export default store;
