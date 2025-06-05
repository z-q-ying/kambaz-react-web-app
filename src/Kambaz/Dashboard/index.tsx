import { Button, Card, Col, Form, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourse,
  deleteCourse,
  setCourse,
  updateCourse,
} from "../Courses/reducer";
import { addEnrollment, removeEnrollment } from "../Account/reducer";
import { useState } from "react";

export default function Dashboard() {
  // Redux
  const { courses, course: currentCourse } = useSelector(
    (state: any) => state.coursesReducer
  );
  const { currentUser, enrollments } = useSelector(
    (state: any) => state.accountReducer
  );
  const dispatch = useDispatch();

  // Local state
  const [showAllCourses, setShowAllCourses] = useState(false);

  // Helper
  const isEnrolled = (userId: string, courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === userId && enrollment.course === courseId
    );
  };

  // Courses to display
  const displayedCourses = showAllCourses
    ? courses
    : courses.filter(
        (c: any) => currentUser && isEnrolled(currentUser._id, c._id)
      );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>
        New Course
        <Button
          variant="success"
          className="float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addCourse(currentCourse))}
        >
          Add
        </Button>
        <Button
          variant="warning"
          className="float-end me-2"
          onClick={() => dispatch(updateCourse(currentCourse))}
          id="wd-update-course-click"
        >
          Update
        </Button>
        <Button
          variant="primary"
          className="float-end me-2"
          onClick={() => {
            setShowAllCourses(!showAllCourses); // Toggle
          }}
        >
          Enrollments
        </Button>
      </h5>
      <br />
      <FormControl
        value={currentCourse.name}
        className="mb-2"
        placeholder="Course Name"
        onChange={(e) =>
          dispatch(setCourse({ ...currentCourse, name: e.target.value }))
        }
      />
      <FormControl
        value={currentCourse.description}
        rows={3}
        as="textarea"
        className="mb-2"
        placeholder="Course Description"
        onChange={(e) =>
          dispatch(setCourse({ ...currentCourse, description: e.target.value }))
        }
      />
      <Form.Group as={Row} className="mb-2" controlId="courseNumber">
        <Form.Label column sm="3">
          Course Number
        </Form.Label>
        <Col sm="9">
          <FormControl
            value={currentCourse.number}
            placeholder="e.g., RS321"
            onChange={(e) =>
              dispatch(setCourse({ ...currentCourse, number: e.target.value }))
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
            value={currentCourse.startDate}
            type="date"
            onChange={(e) =>
              dispatch(
                setCourse({ ...currentCourse, startDate: e.target.value })
              )
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
            value={currentCourse.endDate}
            type="date"
            onChange={(e) =>
              dispatch(setCourse({ ...currentCourse, endDate: e.target.value }))
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
            value={currentCourse.image}
            placeholder="e.g., /images/reactjs.jpg"
            onChange={(e) =>
              dispatch(setCourse({ ...currentCourse, image: e.target.value }))
            }
          />
        </Col>
      </Form.Group>
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c: any) => (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "330px" }}
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

                    <div className="d-flex justify-content-between">
                      {currentUser &&
                        (isEnrolled(currentUser._id, c._id) ? (
                          <Button
                            variant="secondary"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                removeEnrollment({
                                  userId: currentUser._id,
                                  courseId: c._id,
                                })
                              );
                            }}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                addEnrollment({
                                  userId: currentUser._id,
                                  courseId: c._id,
                                })
                              );
                            }}
                          >
                            Enroll
                          </Button>
                        ))}
                      <Button variant="primary"> Go </Button>
                      <Button
                        variant="danger"
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
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          dispatch(setCourse(c));
                        }}
                      >
                        Edit
                      </Button>
                    </div>
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
