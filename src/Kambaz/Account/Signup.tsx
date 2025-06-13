// import { Form } from "react-bootstrap";
// import { Link } from "react-router-dom";

// export default function Signup() {
//   return (
//     <div id="wd-signup-screen">
//       <h1>Signup</h1>
//       <Form.Control id="wd-username" placeholder="username" className="mb-2" />
//       <Form.Control placeholder="password" type="password" className="mb-2" />
//       <Form.Control
//         placeholder="verify password"
//         type="password"
//         className="mb-3"
//       />
//       <Link to="/Kambaz/Account/Profile" className="btn btn-primary w-100 mb-2">
//         Signup
//       </Link>
//       <Link to="/Kambaz/Account/Signin">Signin</Link>
//     </div>
//   );
// }

import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FormControl } from "react-bootstrap";

import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
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
        className="wd-username b-2"
        placeholder="username"
      />
      <FormControl
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2"
        placeholder="password"
        type="password"
      />
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
