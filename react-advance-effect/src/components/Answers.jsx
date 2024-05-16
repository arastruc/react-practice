import { useRef, useState } from "react";
import { shuffledArray } from "../util/util";

export default function Answers({ answers, handleAnswer, questionState }) {
  const shuffledAnswersRef = useRef();
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);

  if (!shuffledAnswersRef.current) {
    shuffledAnswersRef.current = shuffledArray(answers);
  }

  function getButtonClass(answer) {
    return answer === selectedAnswer ? questionState : "";
  }

  return (
    <ul id="answers">
      {shuffledAnswersRef.current.map((answer, index) => (
        <li key={`${answer}-${index}`} className="answer">
          <button
            disabled={questionState}
            className={getButtonClass(answer)}
            onClick={() => {
              handleAnswer(answer);
              setSelectedAnswer(answer);
            }}
          >
            {answer}
          </button>
        </li>
      ))}
    </ul>
  );
}
