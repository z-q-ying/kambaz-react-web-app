import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { setCurrentUser, setAllUsers, setEnrollments } =
  accountSlice.actions;

export default accountSlice.reducer;
