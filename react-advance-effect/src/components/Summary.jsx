import quizCompleteImg from "../assets/quiz-complete.png";

export default function Summary({ results }) {
  const skippedResults = results.filter(({ status }) => status === "skipped");
  const wrongResults = results.filter(({ status }) => status === "wrong");

  const skippedPercent = (skippedResults.length / results.length) * 100;
  const wrongPercent = (wrongResults.length / results.length) * 100;
  const successPercent = 100 - wrongPercent - skippedPercent;

  return (
    <div id="summary">
      <img alt="Trophy Icon" src={quizCompleteImg} />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercent.toFixed(0)}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{successPercent.toFixed(0)}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongPercent.toFixed(0)}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {results.map(({ answer, status, question }, index) => (
          <li key={answer}>
            <h3>{index + 1}</h3>
            <p className="question">{question}</p>
            <p className={`user-answer ${status}`}>{answer}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
