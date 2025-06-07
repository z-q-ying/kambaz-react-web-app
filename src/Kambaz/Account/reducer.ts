import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

// For dev and testing purposes
const defaultTestUser = {
  _id: "123",
  username: "iron_man",
  password: "stark123",
  firstName: "Tony",
  lastName: "Stark",
  email: "tony@stark.com",
  dob: "1970-05-29T00:00:00.000Z",
  role: "FACULTY",
  loginId: "001234561S",
  section: "S101",
  lastActivity: "2020-10-01",
  totalActivity: "10:21:32",
};

const initialState = {
  // For publish, use this profile
  // currentUser: null,
  // For dev and testing, use this profile
  currentUser: defaultTestUser,
  enrollments: enrollments,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
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

export const { setCurrentUser, addEnrollment, removeEnrollment } =
  accountSlice.actions;

export default accountSlice.reducer;
