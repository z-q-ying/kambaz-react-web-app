import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/assignments`;

// Retrieve assignments for selected course
export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}`);
  return response.data;
};

// Create a new assignment group
export const createAssignmentGroup = async (module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${module.courseId}`,
    module
  );
  return response.data;
};

// Update selected assignment group
export const updateAssignmentGroup = async (group: any) => {
  const response = await axios.put(`${COURSES_API}/${group._id}`, group);
  return response.data;
};

// Delete selected assignment group and its associated assignments
export const deleteAssignmentGroup = async (groupId: string) => {
  const response = await axios.delete(`${COURSES_API}/${groupId}`);
  return response.data;
};

// Create a new assignment item for selected group
export const createAssignmentItem = async (groupId: string, assmt: any) => {
  const response = await axios.post(
    `${COURSES_API}/${groupId}/assignment`,
    assmt
  );
  return response.data;
};

// Update selected assignment
export const updateAssignmentItem = async (assmt: any) => {
  const response = await axios.put(
    `${COURSES_API}/assignment/${assmt._id}`,
    assmt
  );
  return response.data; // Updated assignment group, possibly a different group
};

// Delete selected assignment
export const deleteAssignmentItem = async (assignmentId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/assignment/${assignmentId}`
  );
  return response.data; // Updated assignment group
};
