import { Button, Card, Col, Form, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as db from "../Database";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  readonly courses: any[];
  readonly course: any;
  readonly setCourse: (course: any) => void;
  readonly addNewCourse: () => void;
  readonly deleteCourse: (course: any) => void;
  readonly updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = db;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>
        New Course
        <Button
          variant="primary"
          className="float-end"
          id="wd-add-new-course-click"
          onClick={addNewCourse}
        >
          Add
        </Button>
        <Button
          variant="warning"
          className="float-end me-2"
          onClick={updateCourse}
          id="wd-update-course-click"
        >
          Update
        </Button>
      </h5>
      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        placeholder="Course Name"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        value={course.description}
        rows={3}
        as="textarea"
        className="mb-2"
        placeholder="Course Description"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <Form.Group as={Row} className="mb-2" controlId="courseNumber">
        <Form.Label column sm="3">
          Course Number
        </Form.Label>
        <Col sm="9">
          <FormControl
            value={course.number}
            placeholder="e.g., RS321"
            onChange={(e) => setCourse({ ...course, number: e.target.value })}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-2" controlId="startDate">
        <Form.Label column sm="3">
          Start Date
        </Form.Label>
        <Col sm="9">
          <FormControl
            value={course.startDate}
            type="date"
            onChange={(e) =>
              setCourse({ ...course, startDate: e.target.value })
            }
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-2" controlId="endDate">
        <Form.Label column sm="3">
          End Date
        </Form.Label>
        <Col sm="9">
          <FormControl
            value={course.endDate}
            type="date"
            onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-2" controlId="courseImage">
        <Form.Label column sm="3">
          Course Image URL
        </Form.Label>
        <Col sm="9">
          <FormControl
            value={course.image}
            placeholder="e.g., /images/reactjs.jpg"
            onChange={(e) => setCourse({ ...course, image: e.target.value })}
          />
        </Col>
      </Form.Group>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter(
              (course) =>
                currentUser && // avoid currentUser being undefined
                enrollments.some(
                  (enrollment) =>
                    enrollment.user === currentUser._id &&
                    enrollment.course === course._id
                )
            )
            .map((course) => (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      src={course.image || "/images/reactjs.jpg"}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </Card.Text>
                      <Button variant="primary"> Go </Button>

                      <Button
                        variant="danger"
                        className="float-end"
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}
                        id="wd-delete-course-click"
                      >
                        Delete
                      </Button>
                      <Button
                        variant="warning"
                        className="me-2 float-end"
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                      >
                        Edit
                      </Button>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}
