import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attempts: [] as any[],
  currentAttempt: null as any,
  answers: {} as Record<string, any>,
  isPreviewMode: false,
  currentQuiz: null as any,
  isSubmitted: false,
};

const attemptsSlice = createSlice({
  name: "attempts",
  initialState,
  reducers: {
    setAttempts: (state, action) => {
      state.attempts = action.payload;
    },
    setCurrentAttempt: (state, action) => {
      state.currentAttempt = action.payload;
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    updateAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    setPreviewMode: (state, action) => {
      state.isPreviewMode = action.payload;
    },
    setCurrentQuiz: (state, action) => {
      state.currentQuiz = action.payload;
    },
    setIsSubmitted: (state, action) => {
      state.isSubmitted = action.payload;
    },
    resetAttemptState: (state) => {
      state.currentAttempt = null;
      state.answers = {};
      state.isPreviewMode = false;
      state.currentQuiz = null;
      state.isSubmitted = false;
    },
  },
});

export const {
  setAttempts,
  setCurrentAttempt,
  setAnswers,
  updateAnswer,
  setPreviewMode,
  setCurrentQuiz,
  setIsSubmitted,
  resetAttemptState,
} = attemptsSlice.actions;

export default attemptsSlice.reducer;
