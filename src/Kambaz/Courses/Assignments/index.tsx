import { BsGripVertical } from "react-icons/bs";
import { ListGroup, Row, Col } from "react-bootstrap";
import { LuNotebookPen } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  setAssignmentGroups,
  updateAssignmentGroup,
  deleteAssignmentGroup,
} from "../Assignments/reducer";
import AssignmentGroupEditor from "./AssignmentGroupEditor";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentGroupControlButtons from "./AssignmentGroupControlButtons";
import AssignmentItemControlButtons from "./AssignmentItemControlButtons";
import * as assignmentsClient from "./client";
import { formatDateTime } from "../../../utils/dateUtils";

export default function Assignments() {
  const { cid } = useParams();
  const { assignmentGroups } = useSelector(
    (state: any) => state.assignmentReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showGroupEditorModal, setShowGroupEditorModal] = useState(false);
  const [currentGroupToEdit, setCurrentGroupToEdit] = useState<any>(null);
  const [editorMode, setEditorMode] = useState<"add" | "edit">("add");

  const handleCloseGroupEditorModal = () => {
    setShowGroupEditorModal(false);
    setCurrentGroupToEdit(null);
  };

  const handleAddGroup = () => {
    setEditorMode("add");
    setCurrentGroupToEdit(null);
    setShowGroupEditorModal(true);
  };

  const handleEditGroup = (
    groupId: string,
    groupName: string,
    weight: number
  ) => {
    setEditorMode("edit");
    setCurrentGroupToEdit({ _id: groupId, groupName, weight });
    setShowGroupEditorModal(true);
  };

  const handleEditAssignment = (assignmentId: string) => {
    navigate(`/Kambaz/Courses/${cid}/Assignments/${assignmentId}`);
  };

  const fetchAssignmentGroups = async () => {
    const asgmtGroups = await assignmentsClient.findAssignmentsForCourse(
      cid as string
    );
    dispatch(setAssignmentGroups(asgmtGroups));
  };

  useEffect(() => {
    fetchAssignmentGroups();
  }, []);

  const handleSaveGroup = async (name: string, w: number) => {
    if (editorMode === "add") {
      // call client to create a new assignment group
      const newGroup = await assignmentsClient.createAssignmentGroup({
        courseId: cid,
        groupName: name,
        weight: w,
      });
      dispatch(setAssignmentGroups([...assignmentGroups, newGroup]));
    } else if (editorMode === "edit" && currentGroupToEdit) {
      const updatedGroup = await assignmentsClient.updateAssignmentGroup({
        ...currentGroupToEdit,
        groupName: name,
        weight: w,
      });
      dispatch(updateAssignmentGroup(updatedGroup));
    }
    handleCloseGroupEditorModal();
  };

  const handleDeleteGroup = async (groupId: string) => {
    if (window.confirm("Are you sure to delete this assignment group?")) {
      await assignmentsClient.deleteAssignmentGroup(groupId);
      dispatch(deleteAssignmentGroup(groupId));
    }
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    if (window.confirm("Are you sure to delete this assignment?")) {
      const updatedGroup = await assignmentsClient.deleteAssignmentItem(
        assignmentId
      );
      dispatch(
        setAssignmentGroups(
          assignmentGroups.map((g: any) =>
            g._id === updatedGroup._id ? updatedGroup : g
          )
        )
      );
    }
  };

  return (
    <div id="wd-assignments">
      <div className="mb-4 pb-1">
        <AssignmentsControls onAddGroup={handleAddGroup} />
      </div>
      {assignmentGroups.map((g: any) => (
        <ListGroup key={g._id} className="rounded-0" id="wd-modules">
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            {/* Groups */}
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between ">
              <div className="d-flex fw-bold">
                <BsGripVertical className="me-2 fs-3" />
                {g.groupName}
              </div>
              <AssignmentGroupControlButtons
                cid={g.courseId}
                groupId={g._id}
                groupName={g.groupName}
                weight={g.weight}
                onEdit={handleEditGroup}
                onDelete={handleDeleteGroup}
              />
            </div>

            {/* Assignment Items */}
            <ListGroup className="rounded-0" id="wd-modules">
              {g.assignments.map((a: any) => (
                <ListGroup.Item
                  key={a._id}
                  className="wd-assignment-list-item p-3 ps-1"
                >
                  <Row className="align-items-center">
                    <Col xs="auto" className="d-flex align-items-center">
                      <BsGripVertical className="me-2 fs-5" />
                      <LuNotebookPen className="fs-5 text-success" />
                    </Col>
                    <Col className="px-0">
                      <div className="d-flex flex-column text-start">
                        <button
                          onClick={() =>
                            navigate(
                              `/Kambaz/Courses/${cid}/Assignments/${a._id}`
                            )
                          }
                          className="fw-bold text-dark border-0 bg-transparent p-0 m-0 wd-assignment-title-button"
                          style={{ width: "100%", textAlign: "left" }}
                        >
                          {a.title}
                        </button>
                        <small className="text-muted">
                          <span className="text-danger">Multiple Modules</span>{" "}
                          | <b>Not available until</b>{" "}
                          {formatDateTime(a.availableFrom)} | <b>Due</b>{" "}
                          {formatDateTime(a.dueDate)} | {a.points} pts
                        </small>
                      </div>
                    </Col>
                    <Col xs="auto">
                      <AssignmentItemControlButtons
                        assignmentId={a._id}
                        onEdit={handleEditAssignment}
                        onDelete={handleDeleteAssignment}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      ))}

      {/* Assignment Group Editor Modal*/}
      <AssignmentGroupEditor
        show={showGroupEditorModal}
        handleClose={handleCloseGroupEditorModal}
        dialogTitle={
          editorMode === "add"
            ? "Add Assignment Group"
            : "Edit Assignment Group"
        }
        initialGroupName={currentGroupToEdit?.groupName || ""}
        initialWeight={currentGroupToEdit?.weight || ""}
        onSave={handleSaveGroup}
      />
    </div>
  );
}
