import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function AssignmentGroupEditor({
  show,
  handleClose,
  dialogTitle,
  initialGroupName = "",
  initialWeight = "",
  onSave,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  initialGroupName?: string; // Optional for add mode
  initialWeight?: number | ""; // Optional for add mode
  onSave: (groupName: string, weight: number) => void;
}) {
  const [groupName, setGroupName] = useState(initialGroupName);
  const [weight, setWeight] = useState<number | "">(initialWeight);

  // To sync state with props
  useEffect(() => {
    if (show) {
      setGroupName(initialGroupName);
      setWeight(initialWeight);
    }
  }, [show, initialGroupName, initialWeight]); // Dependencies

  const handleSaveClick = () => {
    onSave(groupName, typeof weight === "string" ? 0 : weight);
  };

  const handleModalClose = () => {
    setGroupName("");
    setWeight("");
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleModalClose} // Call handler upon X or Esc
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Group Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Essay Group 1"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupWeight">
            <Form.Label>% of total grade:</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSaveClick}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
