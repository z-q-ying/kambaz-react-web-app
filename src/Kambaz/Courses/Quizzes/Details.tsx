import { useParams } from "react-router-dom";

export default function QuizDetails() {
  const { qid } = useParams();
  return (
    <div id="wd-quiz-details">
      <h2>Quiz Details</h2>
      <p>Quiz ID: {qid}</p>
      <p>Quiz details page is under construction.</p>
    </div>
  );
}
