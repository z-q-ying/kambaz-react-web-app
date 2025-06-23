import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

import * as quizzesClient from "../client";
import * as questionsClient from "../Questions/client";
import * as attemptsClient from "./client";
import QuestionRenderer from "./QuestionRenderer";
import QuizHeader from "./QuizHeader";

export default function PastAttempt() {
  const { cid, qid, aid } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [attempt, setAttempt] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchData();
  }, [aid]);

  const fetchData = async () => {
    if (qid && aid) {
      const quizData = await quizzesClient.findQuizById(qid);
      const questionsData = await questionsClient.findQuestionsForQuiz(qid);
      const attemptData = await attemptsClient.findAttemptById(aid);
      setQuiz(quizData);
      setQuestions(questionsData);
      setAttempt(attemptData);

      const answersMap: Record<string, any> = {};
      attemptData.answers.forEach((answer: any) => {
        answersMap[answer.questionId] = null;
      });
      setAnswers(answersMap);
    }
  };

  if (!quiz || !questions.length || !attempt) {
    return <div className="p-3">Loading...</div>;
  }

  return (
    <div className="p-3">
      <QuizHeader
        title={`${quiz.title} - Past Attempt`}
        showPreviewBanner={false}
      />

      <div className="mb-3">
        <p>
          <strong>Score:</strong> {attempt.totalScore}/{quiz.points || 0}(
          {Math.round((attempt.totalScore / (quiz.points || 1)) * 100)}%)
        </p>
        <p>
          <strong>Submitted:</strong>{" "}
          {new Date(attempt.submittedAt).toLocaleString()}
        </p>
      </div>

      {/* Questions Display */}
      {questions.map((question, index) => {
        const questionResult = attempt.answers.find(
          (a: any) => a.questionId === question._id
        );

        return (
          <QuestionRenderer
            key={question._id}
            question={question}
            index={index}
            answers={answers}
            onAnswerChange={() => {}} // Read-only
            isSubmitted={true}
            questionResult={questionResult}
            useMaxPoints={false}
          />
        );
      })}

      {/* Back Button */}
      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)}
        >
          Back to Quiz Details
        </Button>
      </div>
    </div>
  );
}
