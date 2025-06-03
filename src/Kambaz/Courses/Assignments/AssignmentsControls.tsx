import { Button, Form, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { addAssignmentGroup } from "./reducer";
import AssignmentGroupEditor from "./AssignmentGroupEditor";

export default function AssignmentsControls() {
  const { cid } = useParams();
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setShowAddGroupModal(false);
  };

  const handleShow = () => {
    setShowAddGroupModal(true);
  };

  const handleSave = (name: string, w: number) => {
    const newGroup = {
      groupName: name,
      courseId: cid,
      weight: w,
    };
    dispatch(addAssignmentGroup(newGroup));
    handleClose();
  };

  return (
    <div className="d-flex flex-nowrap justify-content-between align-items-center mb-3 gap-3">
      {/* Search Input */}
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
        <Button
          variant="secondary"
          size="lg"
          className="me-1"
          onClick={handleShow}
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Group
        </Button>
        <Button variant="danger" size="lg" className="me-1">
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </Button>

        {/* Assignment Group Editor Modal */}
        <AssignmentGroupEditor
          show={showAddGroupModal}
          handleClose={handleClose}
          dialogTitle="Add Assignment Group"
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
