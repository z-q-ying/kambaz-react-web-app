import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { IoBanSharp } from "react-icons/io5";

interface QuizPublishStatusProps {
  published: boolean;
  onClick?: () => void;
  showClickableHint?: boolean;
}

export default function QuizPublishStatus({
  published,
  onClick,
  showClickableHint = true,
}: QuizPublishStatusProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  if (published) {
    // Published - Green checkmark
    return (
      <span
        className={`me-1 position-relative ${onClick ? "cursor-pointer" : ""}`}
        onClick={handleClick}
        title={
          showClickableHint && onClick
            ? "Published - Click to unpublish"
            : "Published"
        }
      >
        <FaCheckCircle
          style={{ top: "-10px", right: "1px" }}
          className="text-success me-1 position-absolute fs-5"
        />
        <FaCircle
          style={{
            top: "-10px",
            right: "3px",
            color: "rgba(255,255,255,0.5)", // translucent white
            pointerEvents: "none",
          }}
          className="position-absolute fs-4"
        />
      </span>
    );
  } else {
    // Unpublished - Ban mark
    return (
      <span
        className={`me-1 ${onClick ? "cursor-pointer" : ""}`}
        onClick={handleClick}
        title={
          showClickableHint && onClick
            ? "Unpublished - Click to publish"
            : "Unpublished"
        }
      >
        <IoBanSharp className="text-danger fs-5" />
      </span>
    );
  }
}
