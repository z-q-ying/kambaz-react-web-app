import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h1>Profile</h1>
            <Form.Control defaultValue="alice" placeholder="username" className="mb-2" />
            <Form.Control defaultValue="123" type="password" placeholder="password" className="mb-2" />
            <Form.Control defaultValue="Alice" placeholder="First Name" className="mb-2" />
            <Form.Control defaultValue="Wonderland" placeholder="Last Name" className="mb-2" />
            <Form.Control defaultValue="2000-01-01" type="date" className="mb-2" />
            <Form.Control defaultValue="alice@wonderland.com" type="email" className="mb-2" />
            <Form.Select defaultValue="USER" className="mb-3">
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
            </Form.Select>
            <Link to="/Kambaz/Account/Signin"
                className="btn btn-danger w-100 mb-2">
                Signout
            </Link>
        </div>
    );
}