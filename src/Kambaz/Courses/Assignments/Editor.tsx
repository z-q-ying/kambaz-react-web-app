import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";

function formatDateTime(dt?: string): string {
  if (!dt) return "";
  return dt.substring(0, 16); // Format to "YYYY-MM-DDTHH:MM"
}

export default function AssignmentEditor() {
  const entryOptions = [
    "Text Entry",
    "Website URL",
    "Media Recordings",
    "Student Annotation",
    "File Uploads",
  ];

  const { cid, aid } = useParams();
  const assignment = assignments.find((a) => a._id === aid);

  return (
    <div id="wd-assignments-editor p-3">
      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={assignment?.title} />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            defaultValue={assignment?.description}
          />
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={3} className="text-end">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="number" defaultValue={assignment?.points} />
          </Col>
        </Form.Group>

        {/* Assignment Group */}
        <Form.Group as={Row} className="mb-3" controlId="wd-group">
          <Form.Label column sm={3} className="text-end">
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select defaultValue={assignment?.assignmentGroup}>
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Display Grade */}
        <Form.Group as={Row} className="mb-3" controlId="wd-display-grade-as">
          <Form.Label column sm={3} className="text-end">
            Display Grade as
          </Form.Label>
          <Col sm={9}>
            <Form.Select defaultValue={assignment?.displayGradeAs}>
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
              <option value="Letter Grade">Letter Grade</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Submission Type, including Online Entry Options */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Submission Type
          </Form.Label>
          <Col sm={9}>
            <div className="border p-3 rounded">
              <Form.Select
                defaultValue={assignment?.submissionType}
                className="mb-3"
              >
                <option value="Online">Online</option>
                <option value="No Submission">No Submission</option>
                <option value="On Paper">On Paper</option>
                <option value="External Tool">External Tool</option>
                <option value="Lucid">Lucid</option>
              </Form.Select>
              {assignment?.submissionType === "Online" ? (
                <div>
                  {entryOptions.map((option) => (
                    <Form.Check
                      key={option}
                      type="checkbox"
                      label={option}
                      defaultChecked={assignment?.onlineEntryOptions?.includes(
                        option
                      )}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </Col>
        </Form.Group>

        {/* Assign Section */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end pt-2">
            Assign
          </Form.Label>
          <Col sm={9}>
            <div className="border p-3 rounded">
              <Form.Group className="mb-3">
                <Form.Label>Assign to</Form.Label>
                <Form.Control type="text" defaultValue={assignment?.assignTo} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Due</Form.Label>
                <Form.Control
                  type="datetime-local"
                  defaultValue={formatDateTime(assignment?.dueDate)}
                />
              </Form.Group>

              <Row className="mb-2">
                <Col>
                  <Form.Group>
                    <Form.Label>Available from</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      defaultValue={formatDateTime(assignment?.availableFrom)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Until</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      defaultValue={formatDateTime(assignment?.availableUntil)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Form.Group>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="secondary" size="lg">
              Cancel
            </Button>
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="danger" size="lg">
              Save
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
