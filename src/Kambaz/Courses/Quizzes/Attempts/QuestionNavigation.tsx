import { Button } from "react-bootstrap";

export default function QuestionNavigation({
  questions,
  currentQuestionIndex,
  onQuestionChange,
}: {
  readonly questions: any[];
  readonly currentQuestionIndex: number;
  readonly onQuestionChange: (index: number) => void;
}) {
  return (
    <div className="p-3">
      <h5>Question Navigation</h5>
      <div className="mb-2">
        <span className="fw-bold">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Question Jump Navigation */}
      <div className="d-flex flex-column gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant={index === currentQuestionIndex ? "danger" : "secondary"}
            size="sm"
            onClick={() => onQuestionChange(index)}
            className="text-start"
          >
            {index + 1}. {question.title || `Question ${index + 1}`}
          </Button>
        ))}
      </div>
    </div>
  );
}
