import { Button, Card, Col, Form, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourse,
  deleteCourse,
  setCourse,
  updateCourse,
} from "../Courses/reducer";
import * as db from "../Database"; // TOOD: Needed for enrollments for now

export default function Dashboard() {
  const { enrollments } = db; // TODO: TO Refactor

  const { courses, course } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>
        New Course
        <Button
          variant="primary"
          className="float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addCourse(course))}
        >
          Add
        </Button>
        <Button
          variant="warning"
          className="float-end me-2"
          onClick={() => dispatch(updateCourse(course))}
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
        onChange={(e) =>
          dispatch(setCourse({ ...course, name: e.target.value }))
        }
      />
      <FormControl
        value={course.description}
        rows={3}
        as="textarea"
        className="mb-2"
        placeholder="Course Description"
        onChange={(e) =>
          dispatch(setCourse({ ...course, description: e.target.value }))
        }
      />
      <Form.Group as={Row} className="mb-2" controlId="courseNumber">
        <Form.Label column sm="3">
          Course Number
        </Form.Label>
        <Col sm="9">
          <FormControl
            value={course.number}
            placeholder="e.g., RS321"
            onChange={(e) =>
              dispatch(setCourse({ ...course, number: e.target.value }))
            }
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
              dispatch(setCourse({ ...course, startDate: e.target.value }))
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
            onChange={(e) =>
              dispatch(setCourse({ ...course, endDate: e.target.value }))
            }
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
            onChange={(e) =>
              dispatch(setCourse({ ...course, image: e.target.value }))
            }
          />
        </Col>
      </Form.Group>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            // For dev purposes only, comment out the filter
            .filter(
              (c: any) =>
                currentUser &&
                enrollments.some(
                  (enrollment: any) =>
                    enrollment.user === currentUser._id &&
                    enrollment.course === c._id
                )
            )
            .map((c: any) => (
              <Col
                key={c._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${c._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      src={c.image || "/images/reactjs.jpg"}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {c.description}
                      </Card.Text>
                      <Button variant="primary"> Go </Button>

                      <Button
                        variant="danger"
                        className="float-end"
                        onClick={(event) => {
                          event.preventDefault();
                          dispatch(deleteCourse(c._id));
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
                          dispatch(setCourse(c));
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
