import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const ATTEMPTS_API = `${REMOTE_SERVER}/api/attempts`;

// Get student's attempts for a quiz
export const findAttemptsForStudent = async (
  quizId: string,
  studentId: string
) => {
  const response = await axios.get(
    `${QUIZZES_API}/${quizId}/attempts/student/${studentId}`
  );
  return response.data;
};

// Create a new attempt
export const createAttempt = async (quizId: string, attempt: any) => {
  const response = await axios.post(
    `${QUIZZES_API}/${quizId}/attempts`,
    attempt
  );
  return response.data;
};

// Update an attempt
export const updateAttempt = async (attempt: any) => {
  const response = await axios.put(`${ATTEMPTS_API}/${attempt._id}`, attempt);
  return response.data;
};
