import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentGreenCheckmark from "./AssignmentGreenCheckmark";
import { Dropdown } from "react-bootstrap"; // Import Dropdown
import { FaPencilAlt, FaTrash } from "react-icons/fa"; // Import icons for Edit and Delete

export default function AssignmentItemControlButtons({
  groupId,
  assignmentId,
  onEdit,
  onDelete,
}: {
  groupId: string;
  assignmentId: string;
  onEdit: (groupId: string, assignmentId: string) => void;
  onDelete: (groupId: string, assignmentId: string) => void;
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
          <Dropdown.Item onClick={() => onEdit(groupId, assignmentId)}>
            <FaPencilAlt className="me-2" /> Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onDelete(groupId, assignmentId)}>
            <FaTrash className="me-2" /> Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
