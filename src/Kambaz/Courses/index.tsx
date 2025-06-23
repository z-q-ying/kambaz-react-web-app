import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  useLocation,
  useParams,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";

import { setCurrentCourse } from "./reducer";
import { prepareForRedux } from "../../utils/dateUtils";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import PastAttempt from "./Quizzes/Attempts/PastAttempt";
import PeopleTable from "./People/Table";
import Questions from "./Quizzes/Questions";
import Quizzes from "./Quizzes";

import QuizAttempt from "./Quizzes/Attempts/QuizAttempt";
import QuizDetails from "./Quizzes/Details";
import QuizEditor from "./Quizzes/Editor";
import QuizPreview from "./Quizzes/Attempts/QuizPreview";
import * as coursesClient from "./client";

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
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid" element={<QuizDetails />} />
            <Route path="Quizzes/:qid/attempt" element={<QuizAttempt />} />
            <Route path="Quizzes/:qid/attempts/:aid" element={<PastAttempt />} />
            <Route path="Quizzes/:qid/edit" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
            <Route path="Quizzes/:qid/questions" element={<Questions />} />
            <Route path="Quizzes/new" element={<QuizEditor />} />
            <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
