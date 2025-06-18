import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// Fetch all courses from the server
export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

// Fetch a single course by ID
export const findCourseById = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}`);
  return data;
};

// Create a new course
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
};

// Retrieve the modules for a specific course
export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`
  );
  return response.data;
};

// Create a new module for a specific course
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

// Delete a course by its ID
export const deleteCourse = async (id: string) => {
  const response = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return response.data;
};

// Update an existing course
export const updateCourse = async (course: any) => {
  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return response.data;
};

// Find all enrolled users in a course by course ID
export const findEnrolledUsersInCourse = async (courseId: any) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/enrollments`
  );
  return response.data;
};
