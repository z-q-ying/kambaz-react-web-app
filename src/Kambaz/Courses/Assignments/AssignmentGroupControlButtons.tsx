import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { Dropdown } from "react-bootstrap";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles.css";

export default function AssignmentGroupControlButtons({
  cid,
  groupId,
  groupName,
  weight,
  onEdit,
  onDelete,
}: {
  cid: string;
  groupId: string;
  groupName: string;
  weight: number;
  onEdit: (groupId: string, groupName: string, weight: number) => void;
  onDelete: (groupId: string) => void;
}) {
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center gap-2">
      <div className="px-3 border rounded-pill">{weight}% of Total</div>
      <FaPlus
        className="fs-5"
        onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}
      />

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
