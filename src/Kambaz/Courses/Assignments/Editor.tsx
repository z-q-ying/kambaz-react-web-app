import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import Editor from "react-simple-wysiwyg";

import { addAssignment, setAssignmentGroups } from "./reducer";
import * as assignmentsClient from "./client";

function formatDateTimeForInput(dt?: string): string {
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

  const [currentAssignment, setCurrentAssignment] = useState<any>(null);
  const [currentGroup, setCurrentGroup] = useState<any>(null);

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

  const fetchAssignmentData = async () => {
    if (aid && aid !== "new") {
      const asgmtGroups = await assignmentsClient.findAssignmentsForCourse(
        cid as string
      );
      const foundGroup = asgmtGroups.find((g: any) =>
        g.assignments.some((a: any) => a._id === aid)
      );
      const foundAssignment = foundGroup?.assignments.find(
        (a: any) => a._id === aid
      );

      if (foundAssignment && foundGroup) {
        setCurrentAssignment(foundAssignment);
        setCurrentGroup(foundGroup);
        setFormData({
          title: foundAssignment.title || "",
          description: foundAssignment.description || "",
          points: foundAssignment.points || 0,
          assignmentGroupId: foundGroup._id || "",
          assignmentGroupName: foundGroup.groupName || "",
          displayGradeAs: foundAssignment.displayGradeAs || "Percentage",
          availableFrom:
            formatDateTimeForInput(foundAssignment.availableFrom) || "",
          dueDate: formatDateTimeForInput(foundAssignment.dueDate) || "",
          availableUntil:
            formatDateTimeForInput(foundAssignment.availableUntil) || "",
        });
      }
    }
  };

  useEffect(() => {
    if (aid && aid !== "new") {
      fetchAssignmentData();
    } else {
      // New assignment mode - set initial group from Redux store
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
  }, [aid, assignmentGroups]);

  useEffect(() => {
    console.log(
      "!!! Assignments Editor: Current Assignment:",
      currentAssignment
    );
  }, [currentAssignment]);

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

  const handleSave = async () => {
    const assmtAllData = constructAssignmentItem();
    const { assignmentGroupId, assignmentGroupName, ...assignmentData } =
      assmtAllData;

    // Distinguish between new and existing assignments
    if (aid && aid === "new") {
      const res = await assignmentsClient.createAssignmentItem(
        assignmentGroupId,
        assignmentData
      );
      dispatch(
        addAssignment({
          groupId: assignmentGroupId,
          assignment: res,
        })
      );
    } else {
      await assignmentsClient.updateAssignmentItem(assmtAllData);
      const asgmtGroups = await assignmentsClient.findAssignmentsForCourse(
        cid as string
      );
      dispatch(setAssignmentGroups(asgmtGroups));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const constructAssignmentItem = () => {
    return {
      ...currentAssignment,
      ...formData,
      _id: aid, // aid could be "new" or an existing ID
      availableFrom: formData.availableFrom
        ? new Date(formData.availableFrom).toISOString()
        : "",
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : "",
      availableUntil: formData.availableUntil
        ? new Date(formData.availableUntil).toISOString()
        : "",
    };
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
          <Editor
            value={formData.description}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
            style={{ height: "6em" }}
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
