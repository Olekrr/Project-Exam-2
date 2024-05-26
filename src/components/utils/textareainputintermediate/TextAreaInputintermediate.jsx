import React from "react";

/**
 * A reusable textarea input component.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.label - The label for the textarea.
 * @param {string} props.id - The id for the textarea.
 * @param {string} props.name - The name attribute for the textarea.
 * @param {string} props.value - The current value of the textarea.
 * @param {Function} props.onChange - Function to call when the value changes.
 * @param {Function} [props.onBlur] - Function to call when the textarea loses focus.
 * @param {string} [props.error] - Error message to display if validation fails.
 * @returns {JSX.Element} The TextAreaInput component.
 */
const TextAreaInput = ({
  label,
  id,
  name,
  value,
  onChange,
  onBlur = () => {},
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <textarea
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      ></textarea>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextAreaInput;
