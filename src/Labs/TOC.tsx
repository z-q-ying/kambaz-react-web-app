import { Link, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export default function TOC() {
    const location = useLocation();

    return (
        <Nav variant="pills">
            <Nav.Item>
                <Nav.Link to="/Labs" as={Link} active={location.pathname === "/Labs"}>Labs</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link to="/Labs/Lab1" as={Link} active={location.pathname === "/Labs/Lab1"}>Lab 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link to="/Labs/Lab2" as={Link} active={location.pathname === "/Labs/Lab2"}>Lab 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link to="/Labs/Lab3" as={Link} active={location.pathname === "/Labs/Lab3"}>Lab 3</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link to="/Kambaz" as={Link} active={location.pathname === "/Kambaz"}>Kambaz</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="https://github.com/z-q-ying/kanbas-react-web-app">My GitHub</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}