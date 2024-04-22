import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef();
  const modalRef = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const isRunning = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    handleStop();
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prev) => prev - 200);
    }, 200);
  }

  function handleStop() {
    clearInterval(timer.current);
    modalRef.current.open();
  }

  function onCloseModal() {
    setTimeRemaining(targetTime * 1000);
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>
      <ResultModal
        onCloseModal={onCloseModal}
        ref={modalRef}
        targetTime={targetTime}
        remainingTime={timeRemaining}
      />

      <p className="challenge-time">
        {targetTime} second{targetTime > 1 && "s"}
      </p>
      <p>
        <button onClick={isRunning ? handleStop : handleStart}>
          {isRunning ? "Stop " : "Start "} Challenge
        </button>
      </p>
      <p className={isRunning ? "active" : undefined}>
        {isRunning ? "Time is running..." : "Start"}
      </p>
    </section>
  );
};

export default TimerChallenge;
