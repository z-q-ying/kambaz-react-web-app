import { Button } from "react-bootstrap";

export default function QuestionViewer({
  question,
  onEdit,
  onDelete,
}: {
  readonly question: any;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
}) {
  return (
    <div>
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom fw-bold">
        <span>{question.title || "Untitled Question"}</span>
        <span>{question.points} pts</span>
      </div>

      {/* Description */}
      <div className="p-3">
        {question.question && (
          <div
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: question.question }}
          />
        )}

        {/* Answers */}
        <div className="mb-3 text-muted small">
          Type: {question.type} |
          {question.type === "multiple-choice" &&
            ` ${question.multipleChoiceOptions?.length || 0} choices`}
          {question.type === "true-false" &&
            ` Answer: ${question.trueFalseCorrectAnswer ? "True" : "False"}`}
          {question.type === "fill-in-blank" &&
            ` ${
              question.fillInBlankAnswers?.flatMap(
                (item: any) => item.correctAnswers || []
              ).length || 0
            } possible answers`}
        </div>

        {/* Control Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="primary" size="sm" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
