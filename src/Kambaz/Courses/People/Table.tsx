import { FaUserCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";

import PeopleDetails from "./Details";
import * as coursesClient from "../client";

// Depending on the context, we may have users or enrolled users
export default function PeopleTable({
  users,
  fetchUsers,
}: {
  users?: any[];
  readonly fetchUsers?: () => void;
}) {
  const { cid } = useParams();
  const [enrolledUsers, setEnrolledUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // If no users are provided, fetch enrolled users for the current course
  const fetchEnrolledUsers = async () => {
    if (cid && !users) {
      setLoading(true);
      try {
        const response = await coursesClient.findEnrolledUsersInCourse(cid);
        setEnrolledUsers(response || []);
      } catch (error) {
        console.error("Error fetching enrolled users:", error);
        setEnrolledUsers([]);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchEnrolledUsers();
  }, [cid, users]);

  // Decide which data source to use
  const displayUsers = users || enrolledUsers;
  const displayFetchUsers = fetchUsers || fetchEnrolledUsers;

  if (loading) {
    return <div>Loading enrolled users...</div>;
  }

  return (
    <div id="wd-people-table">
      <PeopleDetails fetchUsers={displayFetchUsers} />
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {displayUsers.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                {cid ? "No enrolled users found" : "No users found"}
              </td>
            </tr>
          ) : (
            displayUsers.map((user: any) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <Link
                    to={`/Kambaz/Account/Users/${user._id}`}
                    className="text-decoration-none text-danger"
                  >
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName}</span>{" "}
                    <span className="wd-last-name">{user.lastName}</span>
                  </Link>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
