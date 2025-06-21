import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaCogSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { RiInboxArchiveLine } from "react-icons/ri";

export default function KambazNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Dashboard", path: "/Kambaz/Dashboard", icon: AiOutlineDashboard },
    { label: "Calendar", path: "/Kambaz/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Kambaz/Inbox", icon: RiInboxArchiveLine },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroup.Item
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        action
        className="bg-black border-0 text-center"
      >
        <img src="/images/neu.png" width="75px" alt="neu logo" />
      </ListGroup.Item>
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Account"
        className={`text-center border-0 bg-black
            ${pathname.includes("Account")
            ? "bg-white text-danger"
            : "bg-black text-white"
          }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"
            }`}
        />
        <br />
        Account
      </ListGroup.Item>
      {links.map((link) => (
        <ListGroup.Item
          key={link.path}
          as={Link}
          to={link.path}
          className={`bg-black text-center border-0
              ${pathname.includes(link.label)
              ? "text-danger bg-white"
              : "text-white bg-black"
            }`}
        >
          {link.icon({ className: "fs-1 text-danger" })}
          <br />
          {link.label}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
