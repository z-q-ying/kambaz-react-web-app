import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Row, Col, Nav, Tab } from "react-bootstrap";
import Editor from "react-simple-wysiwyg";

import { addQuiz, updateQuiz } from "./reducer";
import { formatDateTimeForInput } from "../../../utils/dateUtils";
import * as quizzesClient from "./client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNewQuiz = qid === "new" || !qid;

  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    attemptsAllowed: 1,
    showCorrectAnswers: "after-submission",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    availableUntilDate: "",
    published: false,
  });

  const fetchQuizData = async () => {
    if (!isNewQuiz && qid) {
      const quiz = await quizzesClient.findQuizById(qid);
      setCurrentQuiz(quiz);
      setFormData({
        title: quiz.title || "",
        description: quiz.description || "",
        quizType: quiz.quizType || "Graded Quiz",
        points: quiz.points || 0,
        assignmentGroup: quiz.assignmentGroup || "Quizzes",
        shuffleAnswers: quiz.shuffleAnswers !== false,
        timeLimit: quiz.timeLimit || 20,
        multipleAttempts: quiz.multipleAttempts || false,
        attemptsAllowed: quiz.attemptsAllowed || 1,
        showCorrectAnswers: quiz.showCorrectAnswers || "after-submission",
        accessCode: quiz.accessCode || "",
        oneQuestionAtATime: quiz.oneQuestionAtATime !== false,
        webcamRequired: quiz.webcamRequired || false,
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering || false,
        dueDate: formatDateTimeForInput(quiz.dueDate) || "",
        availableDate: formatDateTimeForInput(quiz.availableDate) || "",
        availableUntilDate:
          formatDateTimeForInput(quiz.availableUntilDate) || "",
        published: quiz.published || false,
      });
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, [qid, isNewQuiz]);

  useEffect(() => {
    console.log("!!! Quizzes Editor: Current Quiz:", currentQuiz);
  }, [currentQuiz]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    const quizData = {
      ...formData,
      courseId: cid,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : "",
      availableDate: formData.availableDate
        ? new Date(formData.availableDate).toISOString()
        : "",
      availableUntilDate: formData.availableUntilDate
        ? new Date(formData.availableUntilDate).toISOString()
        : "",
    };

    if (isNewQuiz) {
      const newQuiz = await quizzesClient.createQuiz(cid as string, quizData);
      dispatch(addQuiz(newQuiz));
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${newQuiz._id}`);
    } else {
      const updatedQuiz = await quizzesClient.updateQuiz({
        ...quizData,
        _id: qid,
      });
      dispatch(updateQuiz(updatedQuiz));
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
    }
  };

  const handleSaveAndPublish = async () => {
    const quizData = {
      ...formData,
      published: true,
      courseId: cid,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : "",
      availableDate: formData.availableDate
        ? new Date(formData.availableDate).toISOString()
        : "",
      availableUntilDate: formData.availableUntilDate
        ? new Date(formData.availableUntilDate).toISOString()
        : "",
    };

    if (isNewQuiz) {
      const newQuiz = await quizzesClient.createQuiz(cid as string, quizData);
      dispatch(addQuiz(newQuiz));
    } else {
      const updatedQuiz = await quizzesClient.updateQuiz({
        ...quizData,
        _id: qid,
      });
      dispatch(updateQuiz(updatedQuiz));
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  return (
    <div id="wd-quiz-editor" className="p-3">
      <Tab.Container
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "details")}
      >
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link
              eventKey="details"
              className={activeTab === "details" ? "text-dark" : "text-danger"}
            >
              Details
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="questions"
              className={
                activeTab === "questions" ? "text-dark" : "text-danger"
              }
            >
              Questions
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="details">
            <Form>
              {/* Quiz Name */}
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Form.Group>

              {/* Description */}
              <Form.Group className="mb-3">
                <Form.Label>Quiz Instructions</Form.Label>
                <Editor
                  value={formData.description}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                  style={{ height: "6em" }}
                />
              </Form.Group>

              {/* Quiz Type */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="text-end">
                  Quiz Type
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    name="quizType"
                    value={formData.quizType}
                    onChange={handleInputChange}
                  >
                    <option value="Graded Quiz">Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              {/* Points */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="text-end">
                  Points
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="number"
                    name="points"
                    value={formData.points}
                    onChange={handleInputChange}
                  />
                </Col>
              </Form.Group>

              {/* Assignment Group */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="text-end">
                  Assignment Group
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    name="assignmentGroup"
                    value={formData.assignmentGroup}
                    onChange={handleInputChange}
                  >
                    <option value="Quizzes">Quizzes</option>
                    <option value="Exams">Exams</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Project">Project</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              {/* Shuffle Answers */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="text-end">
                  Shuffle Answers
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    name="shuffleAnswers"
                    value={formData.shuffleAnswers ? "Yes" : "No"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        shuffleAnswers: e.target.value === "Yes",
                      }))
                    }
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              {/* Time Limit */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="text-end">
                  Time Limit
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="number"
                    name="timeLimit"
                    value={formData.timeLimit}
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-muted">Minutes</Form.Text>
                </Col>
              </Form.Group>

              {/* Multiple Attempts */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="text-end">
                  Multiple Attempts
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    name="multipleAttempts"
                    value={formData.multipleAttempts ? "Yes" : "No"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        multipleAttempts: e.target.value === "Yes",
                      }))
                    }
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              {/* How Many Attempts */}
              {formData.multipleAttempts && (
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3} className="text-end">
                    How Many Attempts
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="number"
                      name="attemptsAllowed"
                      value={formData.attemptsAllowed}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </Col>
                </Form.Group>
              )}

              {/* Show Correct Answers */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="text-end">
                  Show Correct Answers
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    name="showCorrectAnswers"
                    value={formData.showCorrectAnswers}
                    onChange={handleInputChange}
                  >
                    <option value="immediately">Immediately</option>
                    <option value="after-submission">After Submission</option>
                    <option value="after-due-date">After Due Date</option>
                    <option value="never">Never</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              {/* Access Code */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="text-end">
                  Access Code
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    name="accessCode"
                    value={formData.accessCode}
                    onChange={handleInputChange}
                    placeholder="Optional Access Code"
                  />
                </Col>
              </Form.Group>

              {/* One Question at a Time */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="text-end">
                  One Question at a Time
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    name="oneQuestionAtATime"
                    value={formData.oneQuestionAtATime ? "Yes" : "No"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        oneQuestionAtATime: e.target.value === "Yes",
                      }))
                    }
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              {/* Webcam Required */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="text-end">
                  Webcam Required
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    name="webcamRequired"
                    value={formData.webcamRequired ? "Yes" : "No"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        webcamRequired: e.target.value === "Yes",
                      }))
                    }
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              {/* Lock Questions After Answering */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="text-end">
                  Lock Questions After Answering
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    name="lockQuestionsAfterAnswering"
                    value={formData.lockQuestionsAfterAnswering ? "Yes" : "No"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lockQuestionsAfterAnswering: e.target.value === "Yes",
                      }))
                    }
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              {/* Dates */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="text-end pt-2">
                  Assign
                </Form.Label>
                <Col sm={9}>
                  <div className="border p-3 rounded">
                    <Form.Group className="mb-3">
                      <Form.Label>Due</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Row className="mb-2">
                      <Col>
                        <Form.Group>
                          <Form.Label>Available from</Form.Label>
                          <Form.Control
                            type="datetime-local"
                            name="availableDate"
                            value={formData.availableDate}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Until</Form.Label>
                          <Form.Control
                            type="datetime-local"
                            name="availableUntilDate"
                            value={formData.availableUntilDate}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Form.Group>

              {/* Buttons */}
              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button variant="secondary" size="lg" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="danger" size="lg" onClick={handleSave}>
                  Save
                </Button>
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleSaveAndPublish}
                >
                  Save & Publish
                </Button>
              </div>
            </Form>
          </Tab.Pane>

          <Tab.Pane eventKey="questions">
            <div className="text-center mt-5">
              <h4>Questions Editor</h4>
              <p className="text-muted">To be implemented later</p>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
