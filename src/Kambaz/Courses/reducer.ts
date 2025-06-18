import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [] as any[],
  enrolledCourses: [] as any[],
  currentCourse: null as any,
  course: {
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2024-09-10",
    endDate: "2024-12-15",
    image: "/images/reactjs.jpg", // Default image
    description: "New Description",
  },
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
    addCourse: (state, { payload: newCourse }) => {
      state.courses = [...state.courses, newCourse];
      state.enrolledCourses = [...state.enrolledCourses, newCourse];
      state.course = {
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2024-09-10",
        endDate: "2024-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
      };
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((c: any) => c._id !== courseId);
      state.enrolledCourses = state.enrolledCourses.filter(
        (c: any) => c._id !== courseId
      );
    },
    updateCourse: (state, { payload: updatedCourse }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === updatedCourse._id ? updatedCourse : c
      );
      state.enrolledCourses = state.enrolledCourses.map((c: any) =>
        c._id === updatedCourse._id ? updatedCourse : c
      );
      state.course = {
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2024-09-10",
        endDate: "2024-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
      };
    },
  },
});

export const {
  setCourses,
  setCourse,
  setCurrentCourse,
  setEnrolledCourses,
  addCourse,
  deleteCourse,
  updateCourse,
} = coursesSlice.actions;
export default coursesSlice.reducer;
