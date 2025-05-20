import { BsGripVertical } from "react-icons/bs";
import { ListGroup, Row, Col } from "react-bootstrap";
import { LuNotebookPen } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import AssignmentsControls from "./AssignmentsControls";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
  const navigate = useNavigate();

  return (
    <div id="wd-assignments">
      <div className="mb-4 pb-1">
        <AssignmentsControls />
      </div>

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between ">
            <div className="d-flex fw-bold">
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS
            </div>
            <AssignmentControlButtons />
          </div>

          <ListGroup className="wd-lessons  rounded-0 ">
            {/* Assignemnt 1 */}
            <ListGroup.Item className="wd-assignment-list-item p-3 ps-1">
              <Row className="align-items-center">
                <Col xs="auto" className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-5" />
                  <LuNotebookPen className="fs-5 text-success" />
                </Col>
                <Col className="px-0">
                  <div className="d-flex flex-column text-start">
                    <button
                      onClick={() =>
                        navigate("/Kambaz/Courses/1234/Assignments/1")
                      }
                      className="fw-bold text-dark border-0 bg-transparent p-0 m-0 wd-assignment-title-button"
                      style={{ width: "100%", textAlign: "left" }}
                    >
                      A1 - ENV + HTML
                    </button>
                    <small className="text-muted">
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <b>Not available until</b> May 6 at 12:00am | <b>Due</b>{" "}
                      May 13 at 11:59pm | 100 pts
                    </small>
                  </div>
                </Col>
                <Col xs="auto">
                  <LessonControlButtons />
                </Col>
              </Row>
            </ListGroup.Item>

            {/* Assignment 2 */}
            <ListGroup.Item className="wd-assignment-list-item p-3 ps-1">
              <Row className="align-items-center">
                <Col xs="auto" className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-5" />
                  <LuNotebookPen className="fs-5 text-success" />
                </Col>
                <Col className="px-0">
                  <div className="d-flex flex-column text-start">
                    <button
                      onClick={() =>
                        navigate("/Kambaz/Courses/1234/Assignments/2")
                      }
                      className="fw-bold text-dark border-0 bg-transparent p-0 m-0 wd-assignment-title-button"
                      style={{ width: "100%", textAlign: "left" }}
                    >
                      A2 - CSS + BOOTSTRAP
                    </button>
                    <small className="text-muted">
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <b>Not available until</b> May 6 at 12:00am | <b>Due</b>{" "}
                      May 13 at 11:59pm | 100 pts
                    </small>
                  </div>
                </Col>
                <Col xs="auto">
                  <LessonControlButtons />
                </Col>
              </Row>
            </ListGroup.Item>

            {/* Assignment 3 */}
            <ListGroup.Item className="wd-assignment-list-item p-3 ps-1">
              <Row className="align-items-center">
                <Col xs="auto" className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-5" />
                  <LuNotebookPen className="fs-5 text-success" />
                </Col>
                <Col className="px-0">
                  <div className="d-flex flex-column text-start">
                    <button
                      onClick={() =>
                        navigate("/Kambaz/Courses/1234/Assignments/3")
                      }
                      className="fw-bold text-dark border-0 bg-transparent p-0 m-0 wd-assignment-title-button"
                      style={{ width: "100%", textAlign: "left" }}
                    >
                      A3 - JAVASCRIPT + REACT
                    </button>
                    <small className="text-muted">
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <b>Not available until</b> May 20 at 12:00am | <b>Due</b>{" "}
                      May 27 at 11:59pm | 100 pts
                    </small>
                  </div>
                </Col>
                <Col xs="auto">
                  <LessonControlButtons />
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between ">
            <div className="d-flex fw-bold">
              <BsGripVertical className="me-2 fs-3" />
              FINAL PROJECT
            </div>
            <AssignmentControlButtons />
          </div>

          <ListGroup className="wd-lessons  rounded-0 ">
            {/* Final Project */}
            <ListGroup.Item className="wd-assignment-list-item p-3 ps-1">
              <Row className="align-items-center">
                <Col xs="auto" className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-5" />
                  <LuNotebookPen className="fs-5 text-success" />
                </Col>
                <Col className="px-0">
                  <div className="d-flex flex-column text-start">
                    <button
                      onClick={() =>
                        navigate("/Kambaz/Courses/1234/Assignments/4")
                      }
                      className="fw-bold text-dark border-0 bg-transparent p-0 m-0 wd-assignment-title-button"
                      style={{ width: "100%", textAlign: "left" }}
                    >
                      Kambaz Pazza Final Project
                    </button>
                    <small className="text-muted">
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <b>Not available until</b> May 6 at 12:00am | <b>Due</b>{" "}
                      June 22 at 11:59pm | 100 pts
                    </small>
                  </div>
                </Col>
                <Col xs="auto">
                  <LessonControlButtons />
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
