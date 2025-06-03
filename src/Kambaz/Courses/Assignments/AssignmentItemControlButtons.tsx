import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import AssignmentGreenCheckmark from "./AssignmentGreenCheckmark";

export default function AssignmentItemControlButtons() {
  return (
    <div className="d-flex align-items-center gap-2">
      <AssignmentGreenCheckmark />
      <IoEllipsisVertical className="fs-5" />
    </div>
  );
}
