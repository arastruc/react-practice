import { createContext, useReducer } from "react";

export const CounterContext = createContext({
  count: 0,
  increase: () => {},
  decrease: () => {},
});

function cartReducer(state, action) {
  switch (action.type) {
    case "INCREASE":
      return { count: state.count + 1 };

    case "DECREASE":
      return { count: state.count - 1 };

    default:
      return state;
  }
}

const CounterContextProvider = ({ children }) => {
  const [counterState, dispatch] = useReducer(cartReducer, {
    count: 0,
  });

  function handleIncreaseCounter() {
    dispatch({ type: "INCREASE" });
  }

  function handleDecreaseCounter() {
    dispatch({ type: "DECREASE" });
  }

  return (
    <CounterContext.Provider
      value={{
        count: counterState.count,
        increase: handleIncreaseCounter,
        decrease: handleDecreaseCounter,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};

export default CounterContextProvider;
