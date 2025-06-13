import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentGreenCheckmark from "./AssignmentGreenCheckmark";
import { Dropdown } from "react-bootstrap";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

export default function AssignmentItemControlButtons({
  assignmentId,
  onEdit,
  onDelete,
}: {
  assignmentId: string;
  onEdit: (assignmentId: string) => void;
  onDelete: (assignmentId: string) => void;
}) {
  return (
    <div className="d-flex align-items-center gap-2">
      <AssignmentGreenCheckmark />

      {/* Dropdown upon the Ellipsis being clikced */}
      <Dropdown>
        <Dropdown.Toggle
          variant="link"
          id="dropdown-assignment-item"
          className="p-0 no-caret-toggle"
        >
          <IoEllipsisVertical className="fs-5 text-dark" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onEdit(assignmentId)}>
            <FaPencilAlt className="me-2" /> Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onDelete(assignmentId)}>
            <FaTrash className="me-2" /> Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
