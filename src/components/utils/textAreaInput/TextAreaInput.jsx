import React from "react";

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
