import { useEffect, useState } from "react";

export default function QuestionProgress({ step, maxTime, onFinish, mode }) {
  const [remainingTime, setRemainingTime] = useState(maxTime);

  useEffect(() => {
    const timer = setTimeout(onFinish, maxTime);
    return () => {
      clearTimeout(timer);
    };
  }, [onFinish, maxTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - step);
    }, step);

    return () => {
      clearInterval(interval);
    };
  }, [step]);

  return (
    <progress
      id="question-time"
      value={remainingTime}
      max={maxTime}
      className={mode}
    />
  );
}
