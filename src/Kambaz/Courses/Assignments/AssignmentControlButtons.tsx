import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

export default function AssignmentControlButtons({
  weight,
}: {
  weight: number;
}) {
  return (
    <div className="d-flex align-items-center gap-2">
      <div className="px-3 border rounded-pill">{weight}% of Total</div>
      <FaPlus className="fs-5" />
      <IoEllipsisVertical className="fs-5" />
    </div>
  );
}
