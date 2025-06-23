import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

import * as quizzesClient from "../client";
import * as questionsClient from "../Questions/client";
import * as attemptsClient from "./client";

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
  const [attempt, setAttempt] = useState<any>(null);

  useEffect(() => {
    fetchQuizData();
  }, [qid]);

  const fetchQuizData = async () => {
    if (qid && currentUser) {
      const [quizData, questionsData] = await Promise.all([
        quizzesClient.findQuizById(qid),
        questionsClient.findQuestionsForQuiz(qid),
      ]);
      setQuiz(quizData);
      setQuestions(questionsData);

      // Check if there is an existing attempts
      const existingAttempts = await attemptsClient.findAttemptsForStudent(
        qid,
        currentUser._id
      );
      if (existingAttempts.length > 0 && !existingAttempts[0].isCompleted) {
        // Resume incomplete attempt
        const lastAttempt = existingAttempts[0];
        setAttempt(lastAttempt);
        setAnswers(lastAttempt.answers || {});
      }
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
        studentAnswer,
        isCorrect,
        pointsEarned,
      });
    });

    return { totalScore, maxScore, results };
  };

  const handleSubmit = async () => {
    if (!currentUser || !qid) return;

    const scoreData = calculateScore();

    try {
      const attemptData = {
        quizId: qid,
        studentId: currentUser._id,
        attemptNumber: 1, // Simplified - always attempt 1
        answers: scoreData.results,
        totalScore: scoreData.totalScore,
        isCompleted: true,
      };

      if (attempt) {
        // Update existing attempt
        await attemptsClient.updateAttempt({
          ...attemptData,
          _id: attempt._id,
        });
      } else {
        // Create new attempt
        const newAttempt = await attemptsClient.createAttempt(qid, attemptData);
        setAttempt(newAttempt);
      }

      setScore(scoreData);
      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Error submitting quiz:", error);
      console.error("Error details:", error.response?.data);
      alert(
        `Error submitting quiz: ${
          error.response?.data?.error || error.message
        }. Please try again.`
      );
    }
  };

  const renderQuestion = (question: any, index: number) => {
    const studentAnswer = answers[question._id];
    const questionResult = score?.results.find(
      (r: any) => r.questionId === question._id
    );

    return (
      <div key={question._id} className="border mb-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom fw-bold">
          <span>Question {index + 1}</span>
          <span>{question.points} pts</span>
        </div>

        {/* Content */}
        <div className="p-3">
          {question.question && (
            <div
              className="mb-3"
              dangerouslySetInnerHTML={{ __html: question.question }}
            />
          )}

          {/* Question Inputs */}
          {question.type === "multiple-choice" && (
            <div className="mb-3">
              {question.multipleChoiceOptions?.map(
                (option: any, optIndex: number) => (
                  <Form.Check
                    key={optIndex}
                    type="radio"
                    name={`question-${question._id}`}
                    id={`${question._id}-option-${optIndex}`}
                    label={option.text}
                    checked={studentAnswer === option.id}
                    onChange={() => handleAnswerChange(question._id, option.id)}
                    disabled={isSubmitted}
                    className="mb-1"
                  />
                )
              )}
            </div>
          )}

          {question.type === "true-false" && (
            <div className="mb-3">
              <Form.Check
                type="radio"
                name={`question-${question._id}`}
                id={`${question._id}-true`}
                label="True"
                checked={studentAnswer === true}
                onChange={() => handleAnswerChange(question._id, true)}
                disabled={isSubmitted}
                className="mb-1"
              />
              <Form.Check
                type="radio"
                name={`question-${question._id}`}
                id={`${question._id}-false`}
                label="False"
                checked={studentAnswer === false}
                onChange={() => handleAnswerChange(question._id, false)}
                disabled={isSubmitted}
                className="mb-1"
              />
            </div>
          )}

          {question.type === "fill-in-blank" && (
            <div className="mb-3">
              <Form.Control
                type="text"
                value={studentAnswer || ""}
                onChange={(e) =>
                  handleAnswerChange(question._id, e.target.value)
                }
                disabled={isSubmitted}
                placeholder="Enter your answer..."
              />
            </div>
          )}

          {/* Show results after submission */}
          {isSubmitted && questionResult && (
            <div
              className={`mt-2 p-2 rounded ${
                questionResult.isCorrect
                  ? "bg-success text-white"
                  : "bg-danger text-white"
              }`}
            >
              {questionResult.isCorrect ? "✓ Correct " : "✗ Incorrect "}(
              {questionResult.pointsEarned}/{question.points} pts)
            </div>
          )}
        </div>
      </div>
    );
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
          <div className="mb-3">
            <h4>{quiz.title}</h4>
            <h4>
              <b>Quiz Instructions</b>
            </h4>
          </div>

          {/* Question Display */}
          {quiz.oneQuestionAtATime
            ? questions[currentQuestionIndex] &&
              renderQuestion(
                questions[currentQuestionIndex],
                currentQuestionIndex
              )
            : questions.map((question, index) =>
                renderQuestion(question, index)
              )}

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
            <div className="p-3">
              <h5>Question Navigation</h5>
              <div className="mb-2">
                <span className="fw-bold">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>

              {/* Question Jump Navigation */}
              <div className="d-flex flex-column gap-2">
                {questions.map((question, index) => (
                  <Button
                    key={index}
                    variant={
                      index === currentQuestionIndex ? "danger" : "secondary"
                    }
                    size="sm"
                    onClick={() => setCurrentQuestionIndex(index)}
                    className="text-start"
                  >
                    {index + 1}. {question.title || `Question ${index + 1}`}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
