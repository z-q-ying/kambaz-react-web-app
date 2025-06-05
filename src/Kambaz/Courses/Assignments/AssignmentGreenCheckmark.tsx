import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function AssignmentGreenCheckmark() {
  return (
    <span className="me-1 position-relative">
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
}
