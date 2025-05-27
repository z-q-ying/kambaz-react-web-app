import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import Nav from "react-bootstrap/Nav";

export default function TOC() {
  const { pathname } = useLocation();

  const labLinks = [
    { to: "/Labs/Lab1", id: "wd-a1", display: "Lab 1", activeCheck: "Lab1" },
    { to: "/Labs/Lab2", id: "wd-a2", display: "Lab 2", activeCheck: "Lab2" },
    { to: "/Labs/Lab3", id: "wd-a3", display: "Lab 3", activeCheck: "Lab3" },
    { to: "/Labs/Lab4", id: "wd-a4", display: "Lab 4", activeCheck: "Lab4" },
  ];

  return (
    <Nav variant="pills" id="wd-toc">
      {labLinks.map((link) => (
        <Nav.Item key={link.id}>
          <Nav.Link
            as={Link}
            to={link.to}
            id={link.id}
            active={pathname.includes(link.activeCheck)}
          >
            {link.display}
          </Nav.Link>
        </Nav.Item>
      ))}
      <Nav.Item>
        <Nav.Link as={Link} to="/Kambaz" id="wd-a3">
          Kambaz
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="https://github.com/z-q-ying/kanbas-react-web-app"
          target="_blank"
          active={false}
        >
          My GitHub
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
