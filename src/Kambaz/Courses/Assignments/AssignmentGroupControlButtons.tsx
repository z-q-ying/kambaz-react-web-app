import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { Dropdown } from "react-bootstrap";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import "../../styles.css";

export default function AssignmentGroupControlButtons({
  groupId,
  groupName,
  weight,
  onEdit,
  onDelete,
}: {
  groupId: string;
  groupName: string;
  weight: number;
  onEdit: (groupId: string, groupName: string, weight: number) => void;
  onDelete: (groupId: string) => void;
}) {
  return (
    <div className="d-flex align-items-center gap-2">
      <div className="px-3 border rounded-pill">{weight}% of Total</div>
      <FaPlus className="fs-5" />

      {/* Dropdown upon the Ellipsis being clikced */}
      <Dropdown>
        <Dropdown.Toggle
          variant="link"
          id="dropdown-assignment-group"
          className="p-0 no-caret-toggle"
        >
          <IoEllipsisVertical className="fs-5 text-dark" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onEdit(groupId, groupName, weight)}>
            <FaPencilAlt className="me-2" /> Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onDelete(groupId)}>
            <FaTrash className="me-2" /> Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
