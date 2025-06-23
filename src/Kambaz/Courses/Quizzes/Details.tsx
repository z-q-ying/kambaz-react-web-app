import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Alert, Button, Col, Row, Table } from "react-bootstrap";
import { FaBan, FaCheckCircle, FaEdit } from "react-icons/fa";

import { formatDateTime } from "../../../utils/dateUtils";
import { setCurrentQuiz, toggleQuizPublish } from "./reducer";
import * as quizzesClient from "./client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { currentQuiz } = useSelector((state: any) => state.quizReducer);

  const isStudent = currentUser?.role === "STUDENT";

  const fetchQuizData = async () => {
    if (!qid) return;
    const quiz = await quizzesClient.findQuizById(qid);
    dispatch(setCurrentQuiz(quiz));
  };

  useEffect(() => {
    fetchQuizData();
  }, [qid]);

  const handleEdit = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`);
  };

  const handlePreview = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  const handleStartQuiz = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/attempt`);
  };

  const handleTogglePublish = async () => {
    if (!currentQuiz) return;
    await quizzesClient.toggleQuizPublishStatus(
      currentQuiz._id,
      !currentQuiz.published
    );
    dispatch(
      toggleQuizPublish({
        quizId: currentQuiz._id,
        published: !currentQuiz.published,
      })
    );
  };

  // Quiz not found
  if (!currentQuiz) {
    return (
      <div className="p-3">
        <h2>Quiz not found</h2>
        <Link
          to={`/Kambaz/Courses/${cid}/Quizzes`}
          className="btn btn-secondary"
        >
          Back to Quizzes
        </Link>
      </div>
    );
  }

  // Student View
  if (isStudent) {
    return (
      <div id="wd-quiz-details-student" className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>{currentQuiz.title}</h1>
        </div>

        {/* Quiz Information */}
        <div className="mb-4">
          <div className="border-top border-bottom py-2">
            <div className="d-flex flex-wrap gap-3 gap-md-4">
              <div className="flex-shrink-0">
                <span className="fw-bold">Due</span>{" "}
                {currentQuiz.dueDate
                  ? formatDateTime(currentQuiz.dueDate)
                  : "No Due Date"}
              </div>
              <div className="flex-shrink-0">
                <span className="fw-bold">Points</span>{" "}
                {currentQuiz.points || 0}
              </div>
              <div className="flex-shrink-0">
                <span className="fw-bold">Questions</span>{" "}
                {currentQuiz.questions?.length || "TBD"}
              </div>
              <div className="flex-shrink-0">
                <span className="fw-bold">Available</span>{" "}
                {currentQuiz.availableDate && currentQuiz.availableUntilDate
                  ? `${formatDateTime(
                      currentQuiz.availableDate
                    )} - ${formatDateTime(currentQuiz.availableUntilDate)}`
                  : "Always Available"}
              </div>
              <div className="flex-shrink-0">
                <span className="fw-bold">Time Limit</span>{" "}
                {currentQuiz.timeLimit || 20} Minutes
              </div>
              <div className="flex-shrink-0">
                <span className="fw-bold">Multiple Attempts</span>{" "}
                {currentQuiz.multipleAttempts
                  ? `Yes - Number of Attempts: ${
                      currentQuiz.attemptsAllowed || "Unlimited"
                    }`
                  : "No"}
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Description */}
        <div className="mb-4">
          <h5>Instructions</h5>
          <div
            dangerouslySetInnerHTML={{
              __html: currentQuiz.description || "No description available.",
            }}
          />
        </div>

        {/* Stark Quiz Button */}
        <div className="mb-5 d-flex justify-content-center">
          <Button variant="danger" size="lg" onClick={handleStartQuiz}>
            Take the Quiz
          </Button>
        </div>
      </div>
    );
  }

  // Faculty View
  return (
    <div id="wd-quiz-details">
      {/* Header Bar */}
      <div className="header-bar p-3 mb-1">
        <div className="d-flex justify-content-center">
          <div className="d-flex gap-2">
            {currentQuiz.published ? (
              <Button
                variant="success"
                size="lg"
                className="me-1"
                onClick={handleTogglePublish}
              >
                <FaCheckCircle className="me-1" /> Published
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                className="me-1"
                onClick={handleTogglePublish}
              >
                <FaBan className="me-1" /> Publish
              </Button>
            )}
            <Button
              variant="secondary"
              size="lg"
              className="me-1"
              onClick={handlePreview}
            >
              Preview
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="me-1"
              onClick={handleEdit}
            >
              <FaEdit
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Edit
            </Button>
          </div>
        </div>

        {/* Unpublished Banner */}
        {!currentQuiz.published && (
          <Alert variant="danger" className="mt-3 mb-1">
            <b>This quiz is unpublished.</b> Click Publish to make it visible to
            students.
          </Alert>
        )}
      </div>

      {/* Quiz Details */}
      <div className="border rounded p-4 mx-3">
        {/* Title */}
        <header className="quiz-header">
          <h1 id="quiz_title" className="mb-4">
            {currentQuiz.title}
          </h1>

          {/* Metadata */}
          <div className="mb-4" style={{ marginTop: "18px" }}>
            <Row className="mb-1">
              <Col xs={6} md={4} className="text-end fw-bold pe-3">
                Quiz Type
              </Col>
              <Col xs={6} md={8} className="text-start">
                {currentQuiz.quizType || "Graded Quiz"}
              </Col>
            </Row>

            <Row className="mb-1">
              <Col xs={6} md={4} className="text-end fw-bold pe-3">
                Points
              </Col>
              <Col xs={6} md={8} className="text-start">
                {currentQuiz.points || 0}
              </Col>
            </Row>

            <Row className="mb-1">
              <Col xs={6} md={4} className="text-end fw-bold pe-3">
                Assignment Group
              </Col>
              <Col xs={6} md={8} className="text-start">
                {currentQuiz.assignmentGroup || "Quizzes"}
              </Col>
            </Row>

            <Row className="mb-1">
              <Col xs={6} md={4} className="text-end fw-bold pe-3">
                Shuffle Answers
              </Col>
              <Col xs={6} md={8} className="text-start">
                {currentQuiz.shuffleAnswers ? "Yes" : "No"}
              </Col>
            </Row>

            <Row className="mb-1">
              <Col xs={6} md={4} className="text-end fw-bold pe-3">
                Time Limit
              </Col>
              <Col xs={6} md={8} className="text-start">
                {currentQuiz.timeLimit || 20} Minutes
              </Col>
            </Row>

            <Row className="mb-1">
              <Col xs={6} md={4} className="text-end fw-bold pe-3">
                Multiple Attempts
              </Col>
              <Col xs={6} md={8} className="text-start">
                {currentQuiz.multipleAttempts ? "Yes" : "No"}
              </Col>
            </Row>

            {currentQuiz.multipleAttempts && (
              <Row className="mb-1">
                <Col xs={6} md={4} className="text-end fw-bold pe-3">
                  How Many Attempts
                </Col>
                <Col xs={6} md={8} className="text-start">
                  {currentQuiz.attemptsAllowed || 1}
                </Col>
              </Row>
            )}

            <Row className="mb-1">
              <Col xs={6} md={4} className="text-end fw-bold pe-3">
                Show Correct Answers
              </Col>
              <Col xs={6} md={8} className="text-start">
                {currentQuiz.showCorrectAnswers === "immediately" &&
                  "Immediately"}
                {currentQuiz.showCorrectAnswers === "after-submission" &&
                  "After Submission"}
                {currentQuiz.showCorrectAnswers === "after-due-date" &&
                  "After Due Date"}
                {currentQuiz.showCorrectAnswers === "never" && "Never"}
              </Col>
            </Row>

            {currentQuiz.accessCode && (
              <Row className="mb-1">
                <Col xs={6} md={4} className="text-end fw-bold pe-3">
                  Access Code
                </Col>
                <Col xs={6} md={8} className="text-start">
                  {currentQuiz.accessCode}
                </Col>
              </Row>
            )}

            <Row className="mb-1">
              <Col xs={6} md={4} className="text-end fw-bold pe-3">
                One Question at a Time
              </Col>
              <Col xs={6} md={8} className="text-start">
                {currentQuiz.oneQuestionAtATime ? "Yes" : "No"}
              </Col>
            </Row>

            <Row className="mb-1">
              <Col xs={6} md={4} className="text-end fw-bold pe-3">
                Webcam Required
              </Col>
              <Col xs={6} md={8} className="text-start">
                {currentQuiz.webcamRequired ? "Yes" : "No"}
              </Col>
            </Row>

            <Row className="mb-1">
              <Col xs={6} md={4} className="text-end fw-bold pe-3">
                Lock Questions After Answering
              </Col>
              <Col xs={6} md={8} className="text-start">
                {currentQuiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
              </Col>
            </Row>
          </div>

          {/* Dates */}
          <Table className="assignment_dates">
            <thead>
              <tr>
                <th scope="col" className="border-0 border-bottom">
                  Due
                </th>
                <th scope="col" className="border-0 border-bottom">
                  For
                </th>
                <th scope="col" className="border-0 border-bottom">
                  Available from
                </th>
                <th scope="col" className="border-0 border-bottom">
                  Until
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-0 border-bottom">
                  {currentQuiz.dueDate
                    ? formatDateTime(currentQuiz.dueDate)
                    : "No Due Date"}
                </td>
                <td className="border-0 border-bottom">Everyone</td>
                <td className="border-0 border-bottom">
                  {currentQuiz.availableDate
                    ? formatDateTime(currentQuiz.availableDate)
                    : "-"}
                </td>
                <td className="border-0 border-bottom">
                  {currentQuiz.availableUntilDate
                    ? formatDateTime(currentQuiz.availableUntilDate)
                    : "-"}
                </td>
              </tr>
            </tbody>
          </Table>
        </header>
      </div>
    </div>
  );
}
