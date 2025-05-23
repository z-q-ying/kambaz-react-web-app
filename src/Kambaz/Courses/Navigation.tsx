import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const path = `/Kambaz/Courses/${cid}/${link}`;
        const isActive = pathname.includes(link);
        return (
          <Link
            key={link}
            id={`wd-course-${link.toLowerCase()}-link`}
            to={path}
            className={`list-group-item ${
              isActive ? "active" : "text-danger"
            } border border-0`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
