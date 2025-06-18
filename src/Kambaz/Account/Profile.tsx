import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, FormControl } from "react-bootstrap";

import { setCurrentUser } from "./reducer";
import { formatDateForInput, prepareForRedux } from "../../utils/dateUtils";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    const profileWithStringDate = prepareForRedux(updatedProfile);
    dispatch(setCurrentUser(profileWithStringDate));
  };

  const fetchProfile = async () => {
    try {
      const userProfile = await client.profile();
      const profileWithStringDate = prepareForRedux(userProfile);
      setProfile(profileWithStringDate);
    } catch (error) {
      navigate("/Kambaz/Account/Signin");
    }
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const userWithStringDate = prepareForRedux(currentUser);
      setProfile(userWithStringDate);
    }
  }, [currentUser]);

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl
            value={profile.username || ""}
            placeholder="username"
            id="wd-username"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <FormControl
            value={profile.password || ""}
            placeholder="password"
            id="wd-password"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <FormControl
            value={profile.firstName || ""}
            placeholder="first name"
            id="wd-firstname"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <FormControl
            value={profile.lastName || ""}
            placeholder="last name"
            id="wd-lastname"
            className="mb-2"
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <FormControl
            value={formatDateForInput(profile.dob)}
            id="wd-dob"
            className="mb-2"
            onChange={(e) =>
              setProfile({
                ...profile,
                dob: e.target.value,
              })
            }
            type="date"
          />
          <FormControl
            value={profile.email || ""}
            placeholder="email"
            id="wd-email"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            className="form-control mb-2"
            id="wd-role"
            value={profile.role || "USER"}
          >
            <option value="USER">User</option>{" "}
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>{" "}
            <option value="STUDENT">Student</option>
          </select>
          <div>
            <Button
              onClick={updateProfile}
              variant="warning"
              className="w-100 mb-2"
              id="wd-update-btn"
            >
              Update
            </Button>
            <Button
              onClick={signout}
              className="w-100 mb-2"
              id="wd-signout-btn"
            >
              Sign out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
