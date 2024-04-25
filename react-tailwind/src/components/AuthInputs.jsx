import { useState } from "react";
import { styled } from "styled-components";

const ControlInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  color: ${({ $invalid }) => ($invalid ? "#ef4444" : "#6b7280")};
  background-color: ${({ $invalid }) => ($invalid ? "#fed2d2" : "#d1d5db")};
  border-color: ${({ $invalid }) => ($invalid ? "#f73f3f" : undefined)};
  border: 1px solid transparent;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  const ControlInput = styled.input`
    line-height: 1.5;
    color: ${({ $invalid }) => ($invalid ? "#ef4444" : "#6b7280")};
    background-color: ${({ $invalid }) => ($invalid ? "#fed2d2" : "#d1d5db")};
    border-color: ${({ $invalid }) => ($invalid ? "#f73f3f" : undefined)};
    border: 1px solid transparent;
    border-radius: 0.25rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  `;

  const labelClassname = (invalid) =>
    `mb-2 text-base uppercase font-semibold ${
      invalid ? "text-red-700" : "text-stone-800"
    }`;

  const inputClassname = (invalid) =>
    `mb-2 text-base rounded ${
      invalid ? "text-red-700 bg-red-200" : "text-stone-800 bg-stone-200"
    }`;

  return (
    <div
      id="auth-inputs"
      className="flex flex-col justify-around items-center gap-2 mt-8 mb-8 "
      // flex flex-col justify-around mb-6 gap-2 center max-w-44 items-center"
    >
      <div className="">
        <p className="flex flex-col mb-4">
          <label className={labelClassname(emailNotValid)}>Email</label>
          <input
            // $invalid={emailNotValid}
            className={inputClassname(emailNotValid)}
            type="email"
            // style={emailNotValid ? { color: "red" } : { color: "black" }}
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
        </p>
        <p className="flex flex-col mb-4">
          <label className={labelClassname(passwordNotValid)}>Password</label>
          <input
            // $invalid={passwordNotValid}
            type="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
          />
        </p>
      </div>
      <div className="actions">
        <button className="border-stone-400 border-1">
          Create a new account
        </button>
        <button className="border-stone-400 border-1" onClick={handleLogin}>
          Sign In
        </button>
      </div>
    </div>
  );
}
