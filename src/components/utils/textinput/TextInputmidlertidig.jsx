import React from "react";

/**
 * A reusable text input component.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.label - The label for the text input.
 * @param {string} props.id - The id for the text input.
 * @param {string} props.name - The name attribute for the text input.
 * @param {string} [props.type="text"] - The type of the text input.
 * @param {string} props.value - The current value of the text input.
 * @param {Function} props.onChange - Function to call when the value changes.
 * @param {Function} [props.onBlur] - Function to call when the input loses focus.
 * @param {string} [props.error] - Error message to display if validation fails.
 * @returns {JSX.Element} The TextInput component.
 */
const TextInput = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  onBlur = () => {},
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextInput;
