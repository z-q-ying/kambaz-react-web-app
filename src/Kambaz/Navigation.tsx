import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { RiInboxArchiveLine } from "react-icons/ri";

export default function KambazNavigation() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 110 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      {/* NEU logo */}
      <ListGroup.Item
        id="wd-neu-link"
        target="_blank"
        action
        href="https://www.northeastern.edu/"
        className="bg-black border-0 text-center"
      >
        <img
          src="/images/neu.png"
          width="75px"
          alt="Northeastern University logo"
        />
      </ListGroup.Item>

      {/* Account - always white icon */}
      <ListGroup.Item
        to="/Kambaz/Account"
        as={Link}
        className="text-center border-0 bg-black text-white"
      >
        <FaRegCircleUser className="fs-1 text text-white" />
        <br />
        Account
      </ListGroup.Item>

      {/* Dashboard */}
      <ListGroup.Item
        to="/Kambaz/Dashboard"
        as={Link}
        className={`text-center border-0 ${
          isActive("/Kambaz/Dashboard")
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <AiOutlineDashboard className="fs-1" />
        <br />
        Dashboard
      </ListGroup.Item>

      {/* Course - redicte to Dashboard for now */}
      <ListGroup.Item
        to="/Kambaz/Dashboard"
        as={Link}
        className={`text-center border-0 ${
          isActive("/Kambaz/Courses")
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <LiaBookSolid className="fs-1" />
        <br />
        Courses
      </ListGroup.Item>

      {/* Calendar */}
      <ListGroup.Item
        to="/Kambaz/Calendar"
        as={Link}
        className={`text-center border-0 ${
          isActive("/Kambaz/Calendar")
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <IoCalendarOutline className="fs-1" />
        <br />
        Calendar
      </ListGroup.Item>

      {/* Inbox */}
      <ListGroup.Item
        to="/Kambaz/Inbox"
        as={Link}
        className={`text-center border-0 ${
          isActive("/Kambaz/Inbox")
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <RiInboxArchiveLine className="fs-1" />
        <br />
        Inbox
      </ListGroup.Item>

      {/* Labs */}
      <ListGroup.Item
        to="/Labs"
        as={Link}
        className={`text-center border-0 ${
          isActive("/Labs") ? "bg-white text-danger" : "bg-black text-white"
        }`}
      >
        <LiaCogSolid className="fs-1" />
        <br />
        Labs
      </ListGroup.Item>
    </ListGroup>
  );
}
