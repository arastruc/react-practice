import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import CounterContextProvider from "./store/CounterContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
);
