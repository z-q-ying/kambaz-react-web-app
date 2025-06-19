import { BsGripVertical } from "react-icons/bs";
import { IoRocketOutline } from "react-icons/io5";
import { ListGroup, Row, Col } from "react-bootstrap";
import { RiQuestionLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { addQuiz, deleteQuiz, setQuizzes, toggleQuizPublish } from "./reducer";
import { calculateAvailabilityStatus } from "./utils";
import { formatDateTime } from "../../../utils/dateUtils";

import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButtons";
import * as quizzesClient from "./client";

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isStudent = currentUser?.role === "STUDENT";
  console.log("!!! Quizzes: Current user role:", currentUser?.role, isStudent);

  const fetchQuizzes = async () => {
    try {
      const fetchedQuizzes = await quizzesClient.findQuizzesForCourse(
        cid as string
      );
      console.log("!!! Fetched quizzes:", fetchedQuizzes);
      dispatch(setQuizzes(fetchedQuizzes));
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const handleAddQuiz = async () => {
    try {
      const newQuiz = await quizzesClient.createQuiz(cid as string, {
        title: "New Quiz",
      });
      dispatch(addQuiz(newQuiz));
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${newQuiz._id}`);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handleEditQuiz = (quizId: string) => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}`);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await quizzesClient.deleteQuiz(quizId);
        dispatch(deleteQuiz(quizId));
      } catch (error) {
        console.error("Error deleting quiz:", error);
      }
    }
  };

  const handleTogglePublish = async (quizId: string, published: boolean) => {
    try {
      await quizzesClient.toggleQuizPublishStatus(quizId, published);
      dispatch(toggleQuizPublish({ quizId, published }));
    } catch (error) {
      console.error("Error toggling quiz publish status:", error);
    }
  };

  return (
    <div id="wd-quizzes">
      {/* Controls Section */}
      <div className="mb-4 pb-1">
        <QuizzesControls onAddQuiz={handleAddQuiz} />
      </div>

      {/* Quiz List */}
      {quizzes.length === 0 ? (
        <div className="text-center mt-5 pt-5">
          <div className="text-muted mb-3">
            <RiQuestionLine className="fs-1" />
          </div>
          <h5 className="text-muted">No quizzes available</h5>
          <p className="text-muted">
            Click the <strong>+ Quiz</strong> button to create your first quiz
          </p>
        </div>
      ) : (
        <ListGroup className="rounded-0" id="wd-modules">
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            {/* Quiz Header */}
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between">
              <div className="d-flex fw-bold">
                <BsGripVertical className="me-2 fs-3" />
                Assignment Quizzes
              </div>
            </div>

            {/* Quiz Items */}
            <ListGroup className="rounded-0" id="wd-modules">
              {quizzes.map((quiz: any) => (
                <ListGroup.Item
                  key={quiz._id}
                  className="wd-assignment-list-item p-3 ps-1"
                >
                  <Row className="align-items-center">
                    <Col xs="auto" className="d-flex align-items-center">
                      <BsGripVertical className="me-2 fs-5" />
                      <IoRocketOutline className="fs-4 text-success" />
                    </Col>
                    <Col className="px-0">
                      <div className="d-flex flex-column text-start">
                        <button
                          onClick={() => handleEditQuiz(quiz._id)}
                          className="fw-bold text-dark border-0 bg-transparent p-0 m-0 wd-assignment-title-button"
                          style={{ width: "100%", textAlign: "left" }}
                        >
                          {quiz.title}
                        </button>
                        <small className="text-muted">
                          {calculateAvailabilityStatus(
                            quiz.availableDate,
                            quiz.availableUntilDate
                          )}
                          {quiz.dueDate && (
                            <>
                              {" | "}
                              <b>Due</b> {formatDateTime(quiz.dueDate)}
                            </>
                          )}
                          {" | "}
                          {quiz.points} pts
                          {quiz.totalQuestions > 0 && (
                            <>
                              {" | "}
                              {quiz.totalQuestions} Questions
                            </>
                          )}
                        </small>
                      </div>
                    </Col>
                    <Col xs="auto">
                      <QuizControlButtons
                        quiz={quiz}
                        onEdit={handleEditQuiz}
                        onDelete={handleDeleteQuiz}
                        onTogglePublish={handleTogglePublish}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      )}
    </div>
  );
}
