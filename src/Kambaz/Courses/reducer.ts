import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { courses } from "../Database";

const initialState = {
  courses: courses,
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
    // Courses
    addCourse: (state, { payload: newCourseData }) => {
      const newCourse: any = {
        ...newCourseData,
        _id: uuidv4(),
      };
      state.courses = [...state.courses, newCourse] as any;
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
    },
    updateCourse: (state, { payload: updatedCourse }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === updatedCourse._id ? updatedCourse : c
      ) as any;
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

export const { setCourses, setCourse, addCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
