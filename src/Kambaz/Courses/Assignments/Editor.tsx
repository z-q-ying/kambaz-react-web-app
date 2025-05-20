import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor p-3">
      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Assignment Name"
            defaultValue="A1 - ENV + HTML"
          />
        </Form.Group>
      </Form>

      {/* Description */}
      <Form.Group className="mb-3" controlId="wd-description">
        <div className="p-3 border rounded">
          The assignment is{" "}
          <span className="text-danger">available online</span>.
          <br />
          <br />
          Submit a link to the landing page of your Web application running on
          Netlify.
          <br />
          <br />
          The landing page should include the following:
          <ul>
            <li>Your full name and section</li>
            <li>Links to each of the lab assignments</li>
            <li>Link to the Kanbas application</li>
            <li>Links to all relevant source code repositories</li>
          </ul>
          The Kanbas application should include a link to navigate back to the
          landing page.
        </div>
      </Form.Group>

      {/* Points */}
      <Form.Group as={Row} className="mb-3" controlId="wd-points">
        <Form.Label column sm={3} className="text-end">
          Points
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="number" defaultValue={100} />
        </Col>
      </Form.Group>

      {/* Assignment Group */}
      <Form.Group as={Row} className="mb-3" controlId="wd-group">
        <Form.Label column sm={3} className="text-end">
          Assignment Group
        </Form.Label>
        <Col sm={9}>
          <Form.Select defaultValue="ASSIGNMENTS">
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
          <Form.Select defaultValue="Percentage">
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
            <Form.Select defaultValue="Online" className="mb-3">
              <option value="Online">Online</option>
              <option value="No Submission">No Submission</option>
              <option value="On Paper">On Paper</option>
              <option value="External Tool">External Tool</option>
              <option value="Lucid">Lucid</option>
            </Form.Select>
            <Form.Label className="mb-2">Online Entry Options</Form.Label>
            <div>
              <Form.Check type="checkbox" label="Text Entry" />
              <Form.Check type="checkbox" label="Website URL" defaultChecked />
              <Form.Check type="checkbox" label="Media Recordings" />
              <Form.Check type="checkbox" label="Student Annotation" />
              <Form.Check type="checkbox" label="File Uploads" />
            </div>
          </div>
        </Col>
      </Form.Group>

      {/* Assign Section 包含全部内容 */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className="text-end pt-2">
          Assign
        </Form.Label>
        <Col sm={9}>
          <div className="border p-3 rounded">
            <Form.Group className="mb-3">
              <Form.Label>Assign to</Form.Label>
              <Form.Control type="text" defaultValue="Everyone" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due</Form.Label>
              <Form.Control
                type="datetime-local"
                defaultValue="2024-05-13T23:59"
              />
            </Form.Group>

            <Row className="mb-2">
              <Col>
                <Form.Group>
                  <Form.Label>Available from</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    defaultValue="2024-05-06T12:01"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    defaultValue="2024-05-20T23:59"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Col>
      </Form.Group>

      {/* Buttons */}
      <div className="d-flex justify-content-end gap-2 mt-4 ">
        <Link to="/Kambaz/Courses/1234/Assignments">
          <Button variant="secondary" size="lg" className="me-1">
            Cancel
          </Button>
        </Link>
        <Link to="/Kambaz/Courses/1234/Assignments">
          <Button variant="danger" size="lg" className="me-1">
            Save
          </Button>
        </Link>
      </div>
    </div>
  );
}
