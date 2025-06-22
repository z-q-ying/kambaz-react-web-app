import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [] as any[],
  editingQuestionId: null as string | null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, { payload }) => {
      state.questions.push(payload);
    },
    updateQuestion: (state, { payload }) => {
      const questionId = payload._id;
      state.questions = state.questions.map((q: any) =>
        q._id === questionId ? { ...q, ...payload } : q
      );
    },
    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter(
        (q: any) => q._id !== questionId
      );
    },
    setEditingQuestion: (state, { payload }) => {
      state.editingQuestionId = payload;
    },
    clearEditingQuestion: (state) => {
      state.editingQuestionId = null;
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  setEditingQuestion,
  clearEditingQuestion,
} = questionsSlice.actions;

export default questionsSlice.reducer;
