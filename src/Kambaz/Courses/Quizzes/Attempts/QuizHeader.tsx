import { Alert } from "react-bootstrap";
import { BsExclamationCircle } from "react-icons/bs";

export default function QuizHeader({
  title,
  showPreviewBanner = false,
}: {
  readonly title: string;
  readonly showPreviewBanner?: boolean;
}) {
  return (
    <div className="mb-3">
      <h4>{title}</h4>
      {showPreviewBanner && (
        <Alert variant="danger" className="mt-3 mb-3">
          <BsExclamationCircle className="me-2 mb-1" size={18} />
          This is a preview of the published version of the quiz
        </Alert>
      )}
      <h4>
        <b>Quiz Instructions</b>
      </h4>
    </div>
  );
}
