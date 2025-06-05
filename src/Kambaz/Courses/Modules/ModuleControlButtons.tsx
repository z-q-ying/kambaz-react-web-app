import { Dropdown } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
  addLesson,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
  addLesson: (moduleId: string) => void;
}) {
  return (
    <div className="float-end flex-nowrap align-items-center">
      <FaPencil
        onClick={() => editModule(moduleId)}
        className="text-primary me-2"
      />
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={() => deleteModule(moduleId)}
      />
      <GreenCheckmark />
      <Dropdown className="d-inline-block">
        <Dropdown.Toggle variant="link" className="p-0 no-caret-toggle">
          <IoEllipsisVertical className="fs-4 text-dark" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => addLesson(moduleId)}>
            <FaPlus className="me-2" /> New Lesson
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
