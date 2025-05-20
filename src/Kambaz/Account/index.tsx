import { Routes, Route, Navigate } from "react-router-dom";
import AccountNavigation from "./Navigation";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";

export default function Account() {
  return (
    <div id="wd-account-screen" className="d-flex">
      <div>
        <AccountNavigation />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Signin" />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}
