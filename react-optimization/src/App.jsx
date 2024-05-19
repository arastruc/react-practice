import { useState, useContext } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";
import { CounterContext } from "./store/CounterContext.jsx";
import ConfigureCounter from "./components/ConfigureCounter.jsx";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  const counter = useContext(CounterContext);

  const { count, increase, decrease } = counter;

  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick(enteredNumber) {
    setChosenCount(enteredNumber);
  }

  return (
    <>
      <Header />

      <p>Store : {count} </p>

      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>

      <main>
        <ConfigureCounter onSet={handleSetClick} />

        <Counter initialCount={chosenCount} key={chosenCount} />
      </main>
    </>
  );
}

export default App;
