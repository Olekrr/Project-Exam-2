import React from "react";

const CheckboxInput = ({ label, id, name, checked, onChange }) => {
  return (
    <div className="form-group form-check">
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
