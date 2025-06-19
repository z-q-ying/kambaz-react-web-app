import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FormControl, Form } from "react-bootstrap";

import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Signup() {
  const [user, setUser] = useState<any>({ role: "STUDENT" }); // Default to STUDENT
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    navigate("/Kambaz/Account/Profile");
  };

  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username mb-2"
        placeholder="username"
      />
      <FormControl
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2"
        placeholder="password"
        type="password"
      />
      <Form.Group className="mb-2">
        <Form.Select
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          className="wd-role-select"
        >
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
        </Form.Select>
      </Form.Group>
      <button
        onClick={signup}
        className="wd-signup-btn btn btn-primary mb-2 w-100"
      >
        Sign up
      </button>
      <br />
      <Link to="/Kambaz/Account/Signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
