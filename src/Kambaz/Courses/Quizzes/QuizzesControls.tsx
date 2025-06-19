import { Button, Form, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function QuizzesControls({
  onAddQuiz,
}: {
  readonly onAddQuiz: () => void;
}) {
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );
  const isStudent = currentUser?.role === "STUDENT";

  return (
    <div className="d-flex flex-nowrap justify-content-between align-items-center mb-3 gap-3">
      {/* Search Bar */}
      <div style={{ width: "600px" }}>
        <InputGroup size="lg" className="border rounded">
          <InputGroup.Text className="bg-transparent border-0">
            <IoSearchOutline />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search for Quiz"
            className="border-0"
          />
        </InputGroup>
      </div>

      {/* Buttons */}
      <div>
        {!isStudent && (
          <Button
            variant="danger"
            size="lg"
            className="me-1"
            onClick={onAddQuiz}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quiz
          </Button>
        )}
      </div>
    </div>
  );
}
