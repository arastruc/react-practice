export default function Input({ label, id, hasErrors, errorText, ...props }) {
  return (
    <div className="control no-margin">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="email" name={id} {...props} />
      {hasErrors && <p className="control-error">{errorText}</p>}
    </div>
  );
}
