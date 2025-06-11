import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  currentUser: null,
  users: [] as any[],
  enrollments: [] as any[],
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // Setters
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    // Other CRUD operations
    addEnrollment: (state, action) => {
      const { userId, courseId } = action.payload;
      const exists = state.enrollments.some(
        (e: any) => e.user === userId && e.course === courseId
      );
      if (!exists) {
        state.enrollments.push({
          _id: uuidv4(),
          user: userId,
          course: courseId,
        });
      }
    },
    removeEnrollment: (state, action) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === userId && e.course === courseId)
      );
    },
  },
});

export const {
  setCurrentUser,
  setAllUsers,
  setEnrollments,
  addEnrollment,
  removeEnrollment,
} = accountSlice.actions;

export default accountSlice.reducer;
