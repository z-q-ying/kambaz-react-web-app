import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

// Get all questions for a quiz
export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

// Get a single question by ID
export const findQuestionById = async (questionId: string) => {
  const response = await axios.get(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

// Create a new question
export const createQuestion = async (quizId: string, question: any) => {
  const response = await axios.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
};

// Update a question
export const updateQuestion = async (question: any) => {
  const response = await axios.put(
    `${QUESTIONS_API}/${question._id}`,
    question
  );
  return response.data;
};

// Delete a question
export const deleteQuestion = async (questionId: string) => {
  const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

// Update question order for a quiz
export const updateQuestionOrder = async (
  quizId: string,
  questionOrders: any[]
) => {
  const response = await axios.put(
    `${QUIZZES_API}/${quizId}/questions/reorder`,
    {
      questionOrders,
    }
  );
  return response.data;
};

// TODO: Decide to get this front end or back end
// Get total points for a quiz
export const getTotalPointsForQuiz = async (quizId: string) => {
  const response = await axios.get(
    `${QUIZZES_API}/${quizId}/questions/total-points`
  );
  return response.data;
};
