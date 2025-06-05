import { Dropdown } from "react-bootstrap";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function LessonControlButtons({
  moduleId,
  lessonId,
  onEdit,
  onDelete,
}: {
  moduleId: string;
  lessonId: string;
  onEdit: (moduleId: string, lessonId: string) => void;
  onDelete: (moduleId: string, lessonId: string) => void;
}) {
  return (
    <div className="float-end flex-nowrap align-items-center">
      <GreenCheckmark />
      <Dropdown className="d-inline-block">
        <Dropdown.Toggle
          variant="link"
          id={`dropdown-lesson-${lessonId}`}
          className="p-0 no-caret-toggle"
        >
          <IoEllipsisVertical className="fs-4 text-dark" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onEdit(moduleId, lessonId)}>
            <FaPencilAlt className="me-2" /> Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onDelete(moduleId, lessonId)}>
            <FaTrash className="me-2" /> Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
