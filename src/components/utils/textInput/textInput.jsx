import React from "react";

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
