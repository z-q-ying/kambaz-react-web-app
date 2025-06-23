import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row, Nav } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

import {
  setQuestions,
  addQuestion,
  deleteQuestion,
  setEditingQuestion,
} from "./reducer";
import { setCurrentQuiz } from "../reducer";
import QuestionEditor from "./QuestionEditor";
import QuestionViewer from "./QuestionViewer";
import * as client from "./client";
import * as quizzesClient from "../client";

export default function Questions() {
  const location = useLocation();
  const activeTab = location.pathname.includes("/questions")
    ? "questions"
    : "details";

  const { cid, qid } = useParams(); // courseId, quizId
  const { questions, editingQuestionId } = useSelector(
    (state: any) => state.questionsReducer
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchQuestions = async () => {
    if (qid) {
      const questions = await client.findQuestionsForQuiz(qid);
      dispatch(setQuestions(questions));
    }
  };

  const refetchQuiz = async () => {
    if (qid) {
      const quiz = await quizzesClient.findQuizById(qid);
      dispatch(setCurrentQuiz(quiz));
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [qid]);

  const handleNewQuestion = async () => {
    if (!qid) return;

    const newQuestion = {
      title: "New Question",
      type: "multiple-choice",
      question: "",
      points: 1,
      order: questions.length + 1,
      multipleChoiceOptions: [
        { id: "option1", text: "", isCorrect: false },
        { id: "option2", text: "", isCorrect: false },
      ],
    };

    const createdQuestion = await client.createQuestion(qid, newQuestion);
    dispatch(addQuestion(createdQuestion));
    dispatch(setEditingQuestion(createdQuestion._id));
    await refetchQuiz();
  };

  const handleEditQuestion = (questionId: string) => {
    dispatch(setEditingQuestion(questionId));
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      await client.deleteQuestion(questionId);
      dispatch(deleteQuestion(questionId));
      await refetchQuiz();
    }
  };

  return (
    <div id="wd-quiz-questions" className="p-3">
      {/* Navigation Tabs */}
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link
            active={activeTab === "details"}
            className={activeTab === "details" ? "text-dark" : "text-danger"}
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)
            }
            style={{ cursor: "pointer" }}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === "questions"}
            className={activeTab === "questions" ? "text-dark" : "text-danger"}
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/questions`)
            }
            style={{ cursor: "pointer" }}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* New Question */}
      <Row className="mb-4">
        <Col className="text-center">
          <Button variant="secondary" size="lg" onClick={handleNewQuestion}>
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            New Question
          </Button>
        </Col>
      </Row>

      {/* Questions List */}
      {questions.length === 0 ? (
        <div className="text-center mt-5 pt-5">
          <p className="text-muted">
            Click the <strong>+ New Question</strong> button to add the first
            question
          </p>
        </div>
      ) : (
        <div className="mb-4">
          {questions.map((question: any) => (
            <div key={question._id} className="border mb-3">
              {editingQuestionId === question._id ? (
                <QuestionEditor
                  question={question}
                  onCancel={() => dispatch(setEditingQuestion(null))}
                  onSave={async () => {
                    dispatch(setEditingQuestion(null));
                    await fetchQuestions();
                    await refetchQuiz();
                  }}
                />
              ) : (
                <QuestionViewer
                  question={question}
                  onEdit={() => handleEditQuestion(question._id)}
                  onDelete={() => handleDeleteQuestion(question._id)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
