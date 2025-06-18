import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

// Delete a module by its ID
export const deleteModule = async (moduleId: string) => {
  const response = await axios.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

// Update a module by its ID
export const updateModule = async (module: any) => {
  const response = await axios.put(`${MODULES_API}/${module._id}`, module);
  return response.data;
};

// Add a lesson to a module
export const addLessonToModule = async (moduleId: string, lesson: any) => {
  const response = await axios.post(
    `${MODULES_API}/${moduleId}/lessons`,
    lesson
  );
  return response.data;
};

// Update a lesson in a module
export const updateLessonInModule = async (moduleId: string, lesson: any) => {
  const response = await axios.put(
    `${MODULES_API}/${moduleId}/lessons/${lesson._id}`,
    lesson
  );
  return response.data;
};

// Delete a lesson from a module
export const deleteLessonFromModule = async (
  moduleId: string,
  lessonId: string
) => {
  const response = await axios.delete(
    `${MODULES_API}/${moduleId}/lessons/${lessonId}`
  );
  return response.data;
};
