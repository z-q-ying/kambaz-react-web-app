import { Form } from "react-bootstrap";

export default function QuestionRenderer({
  question,
  index,
  answers,
  onAnswerChange,
  isSubmitted,
  questionResult,
  useMaxPoints = false,
}: {
  readonly question: any;
  readonly index: number;
  readonly answers: Record<string, any>;
  readonly onAnswerChange: (questionId: string, answer: any) => void;
  readonly isSubmitted: boolean;
  readonly questionResult?: any;
  readonly useMaxPoints?: boolean;
}) {
  const studentAnswer = answers[question._id];

  return (
    <div key={question._id} className="border mb-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom fw-bold">
        <span>Question {index + 1}</span>
        <span>{question.points} pts</span>
      </div>

      {/* Content */}
      <div className="p-3">
        {question.question && (
          <div
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: question.question }}
          />
        )}

        {/* Question Inputs */}
        {question.type === "multiple-choice" && (
          <div className="mb-3">
            {question.multipleChoiceOptions?.map(
              (option: any, optIndex: number) => (
                <Form.Check
                  key={optIndex}
                  type="radio"
                  name={`question-${question._id}`}
                  id={`${question._id}-option-${optIndex}`}
                  label={option.text}
                  checked={studentAnswer === option.id}
                  onChange={() => onAnswerChange(question._id, option.id)}
                  disabled={isSubmitted}
                  className="mb-1"
                />
              )
            )}
          </div>
        )}

        {question.type === "true-false" && (
          <div className="mb-3">
            <Form.Check
              type="radio"
              name={`question-${question._id}`}
              id={`${question._id}-true`}
              label="True"
              checked={studentAnswer === true}
              onChange={() => onAnswerChange(question._id, true)}
              disabled={isSubmitted}
              className="mb-1"
            />
            <Form.Check
              type="radio"
              name={`question-${question._id}`}
              id={`${question._id}-false`}
              label="False"
              checked={studentAnswer === false}
              onChange={() => onAnswerChange(question._id, false)}
              disabled={isSubmitted}
              className="mb-1"
            />
          </div>
        )}

        {question.type === "fill-in-blank" && (
          <div className="mb-3">
            <Form.Control
              type="text"
              value={studentAnswer || ""}
              onChange={(e) => onAnswerChange(question._id, e.target.value)}
              disabled={isSubmitted}
              placeholder="Enter your answer..."
            />
          </div>
        )}

        {/* Show results after submission */}
        {isSubmitted && questionResult && (
          <div className="mt-2">
            <div
              className={`p-2 rounded ${
                questionResult.isCorrect
                  ? "bg-success text-white"
                  : "bg-danger text-white"
              }`}
            >
              {questionResult.isCorrect ? "✓ Correct " : "✗ Incorrect "}(
              {questionResult.pointsEarned}/
              {useMaxPoints ? questionResult.maxPoints : question.points} pts)
            </div>

            {/* Show correct answer */}
            <div className="mt-2 p-2 bg-light border rounded">
              <strong>Correct Answer: </strong>
              {question.type === "multiple-choice" && (
                <span>
                  {question.multipleChoiceOptions?.find(
                    (opt: any) => opt.isCorrect
                  )?.text || "N/A"}
                </span>
              )}
              {question.type === "true-false" && (
                <span>
                  {question.trueFalseCorrectAnswer ? "True" : "False"}
                </span>
              )}
              {question.type === "fill-in-blank" && (
                <span>
                  {question.fillInBlankAnswers?.[0]?.correctAnswers?.join(
                    ", "
                  ) || "N/A"}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
