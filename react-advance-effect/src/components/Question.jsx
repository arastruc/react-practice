import { useCallback, useState } from "react";
import QUESTIONS from "../data/questions";
import QuestionProgress from "./QuestionProgress";
import Answers from "./Answers";

export default function Question({ index, setUserAnswers }) {
  const [questionState, setQuestionState] = useState(null);

  const currentQuestion = QUESTIONS[index];
  const timer = questionState ? 1500 : 15000;

  const handleAnswer = useCallback(
    (selectedAnswer) => {
      setQuestionState("selected");
      setTimeout(() => {
        //the first answer from the is always the good solution
        if (selectedAnswer === currentQuestion.answers[0]) {
          setQuestionState("correct");
        } else {
          setQuestionState("wrong");
        }
        setTimeout(() => {
          setQuestionState(null);
          setUserAnswers((prev) => [...prev, selectedAnswer]);
        }, 2000);
      }, 2000);
    },
    [currentQuestion]
  );

  return (
    <>
      <div id="question">
        <QuestionProgress
          key={`${currentQuestion.id}-${questionState}`}
          step={250}
          mode={questionState ? "selected" : ""}
          maxTime={timer}
          onFinish={() => {
            if (!questionState) {
              setUserAnswers((prev) => [...prev, ""]);
            }
            return;
          }}
        />
        <h2>{currentQuestion.text}</h2>
      </div>
      <Answers
        key={currentQuestion.id}
        questionState={questionState}
        handleAnswer={handleAnswer}
        answers={[...currentQuestion.answers]}
      />
    </>
  );
}
