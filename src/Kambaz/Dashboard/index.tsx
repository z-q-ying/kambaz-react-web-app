import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  setCourse,
  setCourses,
  setEnrolledCourses,
  addCourse,
  deleteCourse as deleteSpecificCourse,
  updateCourse as updateSpecificCourse,
} from "../Courses/reducer";
import {
  formatDateForInput,
  prepareForRedux,
  prepareArrayForRedux,
} from "../../utils/dateUtils";

import * as coursesClient from "../Courses/client";
import * as accountClient from "../Account/client";

export default function Dashboard() {
  // State management using Redux
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const {
    courses,
    enrolledCourses,
    course: currentCourse,
  } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();

  // Component state management
  const [showAllCourses, setShowAllCourses] = useState(false);
  const getDisplayedCourses = () => {
    return showAllCourses ? courses : enrolledCourses;
  };

  // Check if current user is faculty
  const isFaculty = currentUser?.role === "FACULTY";

  // CRUD Hanldlers
  const fetchCourses = async () => {
    try {
      const fetchedCourses = await coursesClient.fetchAllCourses();
      const coursesWithStringDates = prepareArrayForRedux(fetchedCourses, [
        "startDate",
        "endDate",
      ]);
      dispatch(setCourses(coursesWithStringDates));
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const enrolledCourses = await accountClient.findMyCourses();
      const coursesWithStringDates = prepareArrayForRedux(enrolledCourses, [
        "startDate",
        "endDate",
      ]);
      dispatch(setEnrolledCourses(coursesWithStringDates));
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  const addNewCourse = async () => {
    const newCourse = await accountClient.createCourse(currentCourse);
    const courseWithStringDates = prepareForRedux(newCourse);
    dispatch(addCourse(courseWithStringDates)); // with _id from the server
  };

  const deleteCourse = async (courseId: string) => {
    await coursesClient.deleteCourse(courseId);
    dispatch(deleteSpecificCourse(courseId));
  };

  const updateCourse = async (course: any) => {
    await coursesClient.updateCourse(course);
    dispatch(updateSpecificCourse(course));
  };

  const enrollCourse = async (courseId: string) => {
    await accountClient.enrollUserInCourse(courseId);
    fetchEnrolledCourses();
  };

  const unenrollCourse = async (courseId: string) => {
    await accountClient.unenrollUserFromCourse(courseId);
    fetchEnrolledCourses();
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrolledCourses();
  }, [currentUser]);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {/* New Course Form - Only show for FACULTY */}
      {isFaculty && (
        <>
          <h5>
            New Course
            <Button
              variant="success"
              className="float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </Button>
            <Button
              variant="warning"
              className="float-end me-2"
              onClick={() => updateCourse(currentCourse)}
              id="wd-update-course-click"
            >
              Update
            </Button>
            <Button
              variant="primary"
              className="float-end me-2"
              onClick={() => {
                setShowAllCourses(!showAllCourses);
              }}
            >
              {showAllCourses ? "My Courses" : "All Courses"}
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
              dispatch(
                setCourse({ ...currentCourse, description: e.target.value })
              )
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
                  dispatch(
                    setCourse({ ...currentCourse, number: e.target.value })
                  )
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
                value={formatDateForInput(currentCourse.startDate)}
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
                value={formatDateForInput(currentCourse.endDate)}
                type="date"
                onChange={(e) =>
                  dispatch(
                    setCourse({ ...currentCourse, endDate: e.target.value })
                  )
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
                  dispatch(
                    setCourse({ ...currentCourse, image: e.target.value })
                  )
                }
              />
            </Col>
          </Form.Group>
          <hr />
        </>
      )}
      {/* Course section header with toggle button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          Published Courses ({getDisplayedCourses().length})
        </h2>
        {/* All Courses / My Courses toggle button - always show for all users */}
        <Button
          variant="primary"
          onClick={() => {
            setShowAllCourses(!showAllCourses);
          }}
        >
          {showAllCourses ? "My Courses" : "All Courses"}
        </Button>
      </div>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {getDisplayedCourses().map((c: any) => (
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
                        showAllCourses &&
                        (enrolledCourses.some((ec: any) => ec._id === c._id) ? (
                          <Button
                            variant="secondary"
                            onClick={(event) => {
                              event.preventDefault();
                              unenrollCourse(c._id);
                            }}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            onClick={(event) => {
                              event.preventDefault();
                              enrollCourse(c._id);
                            }}
                          >
                            Enroll
                          </Button>
                        ))}

                      <Button variant="primary"> Go </Button>

                      {/* Only show Delete/Edit buttons for FACULTY */}
                      {isFaculty && (
                        <>
                          <Button
                            variant="danger"
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(c._id);
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
                              const courseToEdit = prepareForRedux(c);
                              dispatch(setCourse(courseToEdit));
                            }}
                          >
                            Edit
                          </Button>
                        </>
                      )}
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
