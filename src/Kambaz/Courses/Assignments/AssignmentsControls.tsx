import { Button, Form, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AssignmentsControls({
  onAddGroup,
}: {
  onAddGroup: () => void; // Function to call for the "+ Group" button
}) {
  const { cid } = useParams();
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );
  const isStudent = currentUser?.role === "STUDENT";

  const handleAddAssignmentClick = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments/new`); // Add mode, no aid
  };

  return (
    <div className="d-flex flex-nowrap justify-content-between align-items-center mb-3 gap-3">
      {/* Search Bar */}
      <div style={{ width: "600px" }}>
        <InputGroup size="lg" className="border rounded">
          <InputGroup.Text className="bg-transparent border-0">
            <IoSearchOutline />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search..."
            className="border-0"
          />
        </InputGroup>
      </div>

      {/* Buttons */}
      <div>
        {!isStudent && (
          <>
            <Button
              variant="secondary"
              size="lg"
              className="me-1"
              onClick={onAddGroup}
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Group
            </Button>
            <Button
              variant="danger"
              size="lg"
              className="me-1"
              onClick={handleAddAssignmentClick}
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Assignment
            </Button>{" "}
          </>
        )}
      </div>
    </div>
  );
}
