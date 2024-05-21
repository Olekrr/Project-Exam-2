import React from "react";

const CheckboxInput = ({ label, id, checked, onChange, name }) => {
  return (
    <div className="mb-3 form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
