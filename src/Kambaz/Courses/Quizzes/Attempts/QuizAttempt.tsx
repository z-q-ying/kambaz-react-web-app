import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import QuestionNavigation from "./QuestionNavigation";
import QuestionRenderer from "./QuestionRenderer";
import QuizHeader from "./QuizHeader";
import * as attemptsClient from "./client";
import * as questionsClient from "../Questions/client";
import * as quizzesClient from "../client";

export default function QuizAttempt() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    fetchQuizData();
  }, [qid]);

  const fetchQuizData = async () => {
    if (qid) {
      const quizData = await quizzesClient.findQuizById(qid);
      const questionsData = await questionsClient.findQuestionsForQuiz(qid);
      setQuiz(quizData);
      setQuestions(questionsData);
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;
    const results: any[] = [];

    questions.forEach((question) => {
      maxScore += question.points;
      const studentAnswer = answers[question._id];
      let isCorrect = false;
      let pointsEarned = 0;

      if (studentAnswer !== undefined) {
        switch (question.type) {
          case "multiple-choice":
            const correctOption = question.multipleChoiceOptions?.find(
              (opt: any) => opt.isCorrect
            );
            isCorrect = studentAnswer === correctOption?.id;
            break;
          case "true-false":
            isCorrect = studentAnswer === question.trueFalseCorrectAnswer;
            break;
          case "fill-in-blank":
            const correctAnswers = question.fillInBlankAnswers?.flatMap(
              (item: any) => item.correctAnswers || []
            );
            isCorrect = correctAnswers?.some(
              (answer: string) =>
                answer.toLowerCase().trim() ===
                studentAnswer?.toLowerCase().trim()
            );
            break;
        }

        if (isCorrect) {
          pointsEarned = question.points;
          totalScore += pointsEarned;
        }
      }

      results.push({
        questionId: question._id,
        isCorrect,
        pointsEarned,
      });
    });

    return { totalScore, maxScore, results };
  };

  const handleSubmit = async () => {
    if (!currentUser || !qid) return;

    const scoreData = calculateScore();
    const existingAttempts = await attemptsClient.findAttemptsForStudent(
      qid,
      currentUser._id
    );
    const attemptNumber = existingAttempts.length + 1;

    const attemptData = {
      quizId: qid,
      studentId: currentUser._id,
      attemptNumber: attemptNumber,
      answers: scoreData.results,
      totalScore: scoreData.totalScore,
    };

    const newAttempt = await attemptsClient.createAttempt(qid, attemptData);
    console.log("!!! Quiz Attempt: Attempt created successfully:", newAttempt);
    setScore(scoreData);
    setIsSubmitted(true);
  };

  if (!currentUser) {
    return (
      <div className="p-3">
        <Alert variant="warning">Please sign in to take the quiz.</Alert>
      </div>
    );
  }

  if (!quiz || !questions.length) {
    return <div className="p-3">No questions available...</div>;
  }

  return (
    <div className="p-3">
      <div className="row">
        {/* Left Column for Content */}
        <div className={quiz.oneQuestionAtATime ? "col-md-8" : "col-12"}>
          {/* Header */}
          <QuizHeader title={quiz.title} showPreviewBanner={false} />

          {/* Question Display */}
          {quiz.oneQuestionAtATime
            ? questions[currentQuestionIndex] && (
                <QuestionRenderer
                  question={questions[currentQuestionIndex]}
                  index={currentQuestionIndex}
                  answers={answers}
                  onAnswerChange={handleAnswerChange}
                  isSubmitted={isSubmitted}
                  questionResult={score?.results.find(
                    (r: any) =>
                      r.questionId === questions[currentQuestionIndex]._id
                  )}
                  useMaxPoints={false}
                />
              )
            : questions.map((question, index) => (
                <QuestionRenderer
                  key={question._id}
                  question={question}
                  index={index}
                  answers={answers}
                  onAnswerChange={handleAnswerChange}
                  isSubmitted={isSubmitted}
                  questionResult={score?.results.find(
                    (r: any) => r.questionId === question._id
                  )}
                  useMaxPoints={false}
                />
              ))}

          {/* Scores */}
          {isSubmitted && score && (
            <div className="border p-3 mb-4 bg-light">
              <h5>Results</h5>
              <p>
                Score: {score.totalScore}/{score.maxScore} (
                {Math.round((score.totalScore / score.maxScore) * 100)}%)
              </p>
            </div>
          )}

          {/* Control Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
            >
              Back to Quizzes
            </Button>
            {!isSubmitted && (
              <Button variant="danger" size="lg" onClick={handleSubmit}>
                Submit Quiz
              </Button>
            )}
          </div>
        </div>

        {/* Optional Right Column */}
        {quiz.oneQuestionAtATime && (
          <div className="col-md-4">
            <QuestionNavigation
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              onQuestionChange={setCurrentQuestionIndex}
            />
          </div>
        )}
      </div>
    </div>
  );
}
