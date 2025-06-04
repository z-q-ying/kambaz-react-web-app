import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "./reducer";

function formatDateTime(dt?: string): string {
  if (!dt) return "";
  const date = new Date(dt);
  if (isNaN(date.getTime())) return ""; // Invalid date str
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { assignmentGroups } = useSelector(
    (state: any) => state.assignmentReducer
  );

  const currentGroup = assignmentGroups.find((g: any) =>
    g.assignments.some((a: any) => a._id === aid)
  );

  const currentAssignment = currentGroup?.assignments.find(
    (a: any) => a._id === aid
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: 0,
    assignmentGroupId: currentGroup?._id || "",
    assignmentGroupName: currentGroup?.groupName || "",
    displayGradeAs: "Percentage",
    availableFrom: "",
    dueDate: "",
    availableUntil: "",
  });

  useEffect(() => {
    if (aid && currentAssignment) {
      // aid exists => edit mode
      setFormData({
        title: currentAssignment.title || "",
        description: currentAssignment.description || "",
        points: currentAssignment.points || 0,
        assignmentGroupId: currentGroup?._id || "",
        assignmentGroupName: currentGroup?.groupName || "",
        displayGradeAs: currentAssignment.displayGradeAs || "Percentage",
        availableFrom: formatDateTime(currentAssignment.availableFrom) || "",
        dueDate: formatDateTime(currentAssignment.dueDate) || "",
        availableUntil: formatDateTime(currentAssignment.availableUntil) || "",
      });
    } else {
      // No aid => add mode
      const initialGroup = assignmentGroups.find(
        (g: any) => g.courseId === cid
      );
      setFormData({
        title: "",
        description: "",
        points: 0,
        assignmentGroupId: initialGroup?._id || "",
        assignmentGroupName: initialGroup?.groupName || "",
        displayGradeAs: "Percentage",
        availableFrom: "",
        dueDate: "",
        availableUntil: "",
      });
    }
  }, [aid, currentAssignment, currentGroup, assignmentGroups]); // Dependencies

  // Handle input changes for controlled components
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Update Assignment Group Name and Assignment Group Id
  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGroupId = e.target.value;
    const selectedGroup = assignmentGroups.find(
      (group: any) => group._id === selectedGroupId
    );
    setFormData((prev) => ({
      ...prev,
      assignmentGroupId: selectedGroup?._id || "",
      assignmentGroupName: selectedGroup?.groupName || "",
    }));
  };

  const handleSave = () => {
    if (aid && aid !== "new") {
      const updatedAssignment = {
        ...currentAssignment,
        ...formData,
        _id: aid,

        availableFrom: formData.availableFrom
          ? new Date(formData.availableFrom).toISOString()
          : "", //
        dueDate: formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : "", //
        availableUntil: formData.availableUntil
          ? new Date(formData.availableUntil).toISOString()
          : "", //
      };
      dispatch(
        updateAssignment({
          groupId: formData.assignmentGroupId,
          assignment: updatedAssignment,
        })
      ); //
    } else {
      const newAssignment = {
        ...formData, //

        availableFrom: formData.availableFrom
          ? new Date(formData.availableFrom).toISOString()
          : "", //
        dueDate: formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : "", //
        availableUntil: formData.availableUntil
          ? new Date(formData.availableUntil).toISOString()
          : "", //
      };
      dispatch(
        addAssignment({
          groupId: formData.assignmentGroupId,
          assignment: newAssignment,
        })
      );
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={3} className="text-end">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              name="points"
              value={formData.points}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        {/* Assignment Group */}
        <Form.Group as={Row} className="mb-3" controlId="wd-group">
          <Form.Label column sm={3} className="text-end">
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select
              name="assignmentGroupId"
              value={formData.assignmentGroupId}
              onChange={handleGroupChange}
            >
              {assignmentGroups.filter((g: any) => g.courseId === cid).length >
              0 ? (
                assignmentGroups
                  .filter((g: any) => g.courseId === cid)
                  .map((groupOption: any) => (
                    <option key={groupOption._id} value={groupOption._id}>
                      {groupOption.groupName}
                    </option>
                  ))
              ) : (
                <option value="">
                  No Groups Available - Please Create a Group First
                </option>
              )}
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Display Grade */}
        <Form.Group as={Row} className="mb-3" controlId="wd-display-grade-as">
          <Form.Label column sm={3} className="text-end">
            Display Grade as
          </Form.Label>
          <Col sm={9}>
            <Form.Select
              name="displayGradeAs"
              value={formData.displayGradeAs}
              onChange={handleChange}
            >
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
              <option value="Letter Grade">Letter Grade</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Date Section */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end pt-2">
            Dates
          </Form.Label>
          <Col sm={9}>
            <div className="border p-3 rounded">
              <Form.Group className="mb-3">
                <Form.Label>Due</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row className="mb-2">
                <Col>
                  <Form.Group>
                    <Form.Label>Available from</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="availableFrom"
                      value={formData.availableFrom}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Until</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="availableUntil"
                      value={formData.availableUntil}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Form.Group>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="secondary" size="lg">
              Cancel
            </Button>
          </Link>
          <Button variant="danger" size="lg" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
