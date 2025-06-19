// Core quiz question types
export interface Question {
  _id: string;
  title: string;
  type: "multiple-choice" | "true-false" | "fill-blank" | "essay" | "matching";
  points: number;
  question: string;
  answers?: Answer[];
  correctAnswer?: string | string[];
}

export interface Answer {
  _id: string;
  text: string;
  correct: boolean;
}

// Main quiz interface
export interface Quiz {
  _id: string;
  title: string;
  description?: string;
  courseId: string;
  points: number;
  dueDate?: string;
  availableDate?: string;
  availableUntilDate?: string;
  published: boolean;
  questions: string[]; // Array of question IDs (references)
  totalQuestions: number;
  availabilityText: string;
  multipleAttempts: boolean;
  showCorrectAnswers: "never" | "after-submission" | "after-due-date";
  accessCode?: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  timeLimit?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Quiz attempt and submission tracking
export interface QuizAttempt {
  _id: string;
  quizId: string;
  userId: string;
  attempt: number;
  score: number;
  answers: { [questionId: string]: string | string[] };
  startedAt: string;
  submittedAt?: string;
  timeElapsed?: number; // in seconds
}

export interface QuizSubmission {
  _id: string;
  quizId: string;
  userId: string;
  attempts: QuizAttempt[];
  finalScore: number;
  finalAttempt: number;
}

// UI helper types
export type QuizAvailabilityStatus =
  | "available"
  | "closed"
  | "not-available-yet";

export interface CreateQuizRequest {
  title: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
  availableUntilDate?: string;
  published?: boolean;
  multipleAttempts?: boolean;
  showCorrectAnswers?: "never" | "after-submission" | "after-due-date";
  accessCode?: string;
  oneQuestionAtATime?: boolean;
  webcamRequired?: boolean;
  lockQuestionsAfterAnswering?: boolean;
  timeLimit?: number;
}
