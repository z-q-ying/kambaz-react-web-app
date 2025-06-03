import { createSlice } from "@reduxjs/toolkit";

// For dev and testing purposes
// const defaultTestUser = {
//   _id: "123",
//   username: "iron_man",
//   password: "stark123",
//   firstName: "Tony",
//   lastName: "Stark",
//   email: "tony@stark.com",
//   dob: "1970-05-29T00:00:00.000Z",
//   role: "FACULTY",
//   loginId: "001234561S",
//   section: "S101",
//   lastActivity: "2020-10-01",
//   totalActivity: "10:21:32",
// };

const initialState = {
  // For publish, use this profile
  currentUser: null,
  // For dev and testing, use this profile
  // currentUser: defaultTestUser,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;

export default accountSlice.reducer;
