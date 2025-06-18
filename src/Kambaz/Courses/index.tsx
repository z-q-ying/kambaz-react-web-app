import { FaAlignJustify } from "react-icons/fa";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrentCourse } from "./reducer";

import { prepareForRedux } from "../../utils/dateUtils";
import * as coursesClient from "./client";

import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import PeopleTable from "./People/Table";

export default function Courses() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { courses, currentCourse } = useSelector(
    (state: any) => state.coursesReducer
  );

  const course =
    courses.find((course: any) => course._id === cid) ||
    (currentCourse?._id === cid ? currentCourse : null);

  const fetchCurrentCourse = async (courseId: string) => {
    try {
      const fetchedCourse = await coursesClient.findCourseById(courseId);
      const courseWithStringDates = prepareForRedux(fetchedCourse, [
        "startDate",
        "endDate",
      ]);
      dispatch(setCurrentCourse(courseWithStringDates));
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  useEffect(() => {
    if (cid && !course) {
      fetchCurrentCourse(cid);
    }
  }, [cid, course]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-3 fs-4 mb-1" />
        {course?.name || "Loading..."} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h2>Piazza</h2>} />
            <Route path="Zoom" element={<h2>Zoom</h2>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<h2>Quizzes</h2>} />
            <Route path="Quizzes/:aid" element={<h2>Quizzes Editor</h2>} />
            <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
