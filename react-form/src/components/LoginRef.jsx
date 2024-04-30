import { useRef, useState } from "react";
import {
  hasMinLength,
  isEmail,
  isNotEmpty,
  isObjectEmpty,
} from "../util/validation";

export default function LoginRef() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [formErrors, setFormErrors] = useState({});

  function handleReset(event) {
    event.target.reset();
  }

  function handleSubmitForm(event) {
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    event.preventDefault();

    let errors = {};

    if (!isEmail(enteredEmail)) {
      errors.email = true;
    }

    if (!(isNotEmpty(enteredPassword) || hasMinLength(enteredPassword, 6))) {
      errors.password = true;
    }

    setFormErrors(errors);

    if (!isObjectEmpty(errors)) {
      return;
    }

    console.log({ email: enteredEmail, password: enteredPassword });
  }

  return (
    <form onSubmit={handleSubmitForm} onReset={handleReset}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input ref={emailRef} id="email" type="email" name="email" />
          {formErrors.email && (
            <p className="control-error">Merci de renseigner un email valide</p>
          )}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            id="password"
            type="password"
            name="password"
          />

          {formErrors.password && (
            <p className="control-error">
              Merci de renseigner un password valide
            </p>
          )}
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
