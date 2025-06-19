import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any[],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload }) => {
      state.quizzes.push(payload);
    },
    updateQuiz: (state, { payload }) => {
      const quizId = payload._id;
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, ...payload } : q
      );
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
    },
    toggleQuizPublish: (state, { payload }) => {
      const { quizId, published } = payload;
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, published } : q
      );
    },
  },
});

export const {
  setQuizzes,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  toggleQuizPublish,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
