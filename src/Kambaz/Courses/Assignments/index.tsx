// TODO: removed unused import
import { BsGripVertical } from "react-icons/bs";
import { ListGroup, Row, Col } from "react-bootstrap";
import { LuNotebookPen } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentGroupControlButtons from "./AssignmentGroupControlButtons";
import AssignmentItemControlButtons from "./AssignmentItemControlButtons";

function formatDateTime(dt: string): string {
  const date = new Date(dt);
  return date
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(", ", " at ");
}

export default function Assignments() {
  const { cid } = useParams();
  console.log("!!! Assignments component rendered for course ID:", cid);
  const { assignmentGroups } = useSelector(
    (state: any) => state.assignmentReducer
  );
  console.log("!!! Assignments Groups", assignmentGroups);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div id="wd-assignments">
      <div className="mb-4 pb-1">
        <AssignmentsControls />
      </div>
      {assignmentGroups
        .filter((g: any) => g.courseId === cid)
        .map((g: any) => (
          <ListGroup key={g._id} className="rounded-0" id="wd-modules">
            <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
              {/* Groups */}
              <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between ">
                <div className="d-flex fw-bold">
                  <BsGripVertical className="me-2 fs-3" />
                  {g.groupName}
                </div>
                <AssignmentGroupControlButtons weight={g.weight} />
              </div>

              {/* Assignment Items */}
              <ListGroup className="rounded-0" id="wd-modules">
                {g.assignments.map((a: any) => (
                  <ListGroup.Item
                    key={a._id}
                    className="wd-assignment-list-item p-3 ps-1"
                  >
                    <Row className="align-items-center">
                      <Col xs="auto" className="d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-5" />
                        <LuNotebookPen className="fs-5 text-success" />
                      </Col>
                      <Col className="px-0">
                        <div className="d-flex flex-column text-start">
                          <button
                            onClick={() =>
                              navigate(
                                `/Kambaz/Courses/${cid}/Assignments/${a._id}`
                              )
                            }
                            className="fw-bold text-dark border-0 bg-transparent p-0 m-0 wd-assignment-title-button"
                            style={{ width: "100%", textAlign: "left" }}
                          >
                            {a.title}
                          </button>
                          <small className="text-muted">
                            <span className="text-danger">
                              Multiple Modules
                            </span>{" "}
                            | <b>Not available until</b>{" "}
                            {formatDateTime(a.availableFrom)} | <b>Due</b>{" "}
                            {formatDateTime(a.dueDate)} | {a.points} pts
                          </small>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <AssignmentItemControlButtons />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        ))}
    </div>
  );
}
