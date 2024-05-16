import { useState } from "react";
import QUESTIONS from "../data/questions";
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const quizzIsComplete = userAnswers.length === QUESTIONS.length;

  function buildResultsFromAnswer() {
    return userAnswers.map((answer, index) => {
      let ans = { question: QUESTIONS[index].text, answer: answer };

      if (answer === QUESTIONS[index].answers[0]) {
        return { ...ans, status: "correct" };
      } else if (answer === "") {
        return { ...ans, status: "skipped" };
      } else {
        return { ...ans, status: "wrong" };
      }
    });
  }

  return (
    <section id="quiz">
      {quizzIsComplete ? (
        <Summary results={buildResultsFromAnswer()} />
      ) : (
        <Question index={userAnswers.length} setUserAnswers={setUserAnswers} />
      )}
    </section>
  );
}
