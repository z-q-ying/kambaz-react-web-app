import { IoEllipsisVertical } from "react-icons/io5";
import { Dropdown } from "react-bootstrap";
import { FaPencilAlt, FaTrash, FaCheckCircle, FaBan } from "react-icons/fa";
import { useSelector } from "react-redux";

import QuizPublishStatus from "./QuizPublishStatus";

export default function QuizControlButtons({
  quiz,
  onEdit,
  onDelete,
  onTogglePublish,
}: {
  quiz: any;
  onEdit: (quizId: string) => void;
  onDelete: (quizId: string) => void;
  onTogglePublish: (quizId: string, published: boolean) => void;
}) {
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );
  const isStudent = currentUser?.role === "STUDENT";

  if (isStudent) {
    return null;
  }

  return (
    <div className="d-flex align-items-center gap-2">
      {/* Publish Status - clickable */}
      <QuizPublishStatus
        published={quiz.published}
        onClick={() => onTogglePublish(quiz._id, !quiz.published)}
      />

      {/* Dropdown Menu */}
      <Dropdown>
        <Dropdown.Toggle
          variant="link"
          id="dropdown-quiz-item"
          className="p-0 no-caret-toggle"
        >
          <IoEllipsisVertical className="fs-5 text-dark" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onEdit(quiz._id)}>
            <FaPencilAlt className="me-2" /> Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onDelete(quiz._id)}>
            <FaTrash className="me-2" /> Delete
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => onTogglePublish(quiz._id, !quiz.published)}
          >
            {quiz.published ? (
              <>
                <FaBan className="me-2" /> Unpublish
              </>
            ) : (
              <>
                <FaCheckCircle className="me-2" /> Publish
              </>
            )}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
