import { useState } from "react";

export default function useInput(initialValue, validateField) {
  const [value, setValue] = useState(initialValue);
  const [hasErrors, setHasErrors] = useState(false);

  function reset() {
    setHasErrors(false);
    setValue(initialValue);
  }

  function onChange(e) {
    setHasErrors(false);
    setValue(e.target.value);
  }

  function onBlur() {
    setHasErrors(!validateField(value));
  }

  return { value, reset, onChange, onBlur, hasErrors };
}
