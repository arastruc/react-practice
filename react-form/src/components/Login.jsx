import { useState } from "react";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";
import Input from "./Input";

const initialForm = {
  email: { data: "", triggered: false },
  password: { data: "", triggered: false },
};

export default function Login() {
  const [formValues, setFormValues] = useState(initialForm);

  let passwordIsInvalid =
    formValues.password.triggered &&
    !(
      isNotEmpty(formValues.password.data) &&
      hasMinLength(formValues.password.data, 6)
    );

  let emailIsInvalid =
    formValues.email.triggered && !isEmail(formValues.email.data);

  function handleSubmitForm(event) {
    event.preventDefault();
    if (
      !isEmail(formValues.email.data) ||
      !(
        isNotEmpty(formValues.password.data) &&
        hasMinLength(formValues.password.data, 6)
      )
    ) {
      return;
    }

    console.log(formValues);
  }

  function handleResetForm() {
    setFormValues(initialForm);
  }

  function handleChange(e, identifier) {
    setFormValues((prev) => ({
      ...prev,
      [identifier]: { triggered: false, data: e.target.value },
    }));
  }

  function handleBlur(identifier) {
    setFormValues((prev) => ({
      ...prev,
      [identifier]: { ...prev[identifier], triggered: true },
    }));
  }

  return (
    <form onSubmit={handleSubmitForm} onReset={handleResetForm}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          onBlur={() => handleBlur("email")}
          onChange={(e) => handleChange(e, "email")}
          value={formValues.email.data}
          errorText="Merci de renseigner un email valide"
          hasErrors={emailIsInvalid}
        />

        <Input
          label="Email"
          id="password"
          type="password"
          onBlur={() => handleBlur("password")}
          onChange={(e) => handleChange(e, "password")}
          value={formValues.password.data}
          errorText="Merci de renseigner un mot de passe valide"
          hasErrors={passwordIsInvalid}
        />
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
