import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";
import Input from "./Input";
import useInput from "../hooks/useInput";

export default function LoginUse() {
  function isPasswordValid(value) {
    return isNotEmpty(value) && hasMinLength(value, 6);
  }

  const {
    value: emailValue,
    reset: resetEmail,
    onChange: onChangeEmail,
    onBlur: onBlurEmail,
    hasErrors: hasEmailsErrors,
  } = useInput("", isEmail);

  const {
    value: passwordValue,
    reset: resetPassword,
    onChange: onChangePassword,
    onBlur: onBlurPassword,
    hasErrors: hasPasswordErrors,
  } = useInput("", isPasswordValid);

  const hasErrors = hasEmailsErrors || hasPasswordErrors;

  function handleSubmitForm(event) {
    event.preventDefault();

    if (hasErrors) {
      return;
    }

    console.log({ email: emailValue, password: passwordValue });
  }

  function handleResetForm() {
    resetEmail();
    resetPassword();
  }

  return (
    <form onSubmit={handleSubmitForm} onReset={handleResetForm}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          onBlur={onBlurEmail}
          onChange={onChangeEmail}
          value={emailValue}
          errorText="Merci de renseigner un email valide"
          hasErrors={hasEmailsErrors}
        />

        <Input
          label="Mot de passe"
          id="password"
          type="password"
          onBlur={onBlurPassword}
          onChange={onChangePassword}
          value={passwordValue}
          errorText="Merci de renseigner un mot de passe valide"
          hasErrors={hasPasswordErrors}
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
