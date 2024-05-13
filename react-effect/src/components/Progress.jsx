import { useEffect, useState } from "react";

export default function Progress({ step, maxTime }) {
  const [remainingTime, setRemainingTime] = useState(maxTime);

  useEffect(() => {
    let progress = setInterval(() => {
      setRemainingTime((prev) => prev - step);
    }, step);

    return () => {
      clearInterval(progress);
    };
  }, []);

  console.log(remainingTime);
  return <progress value={remainingTime} max={maxTime} />;
}
