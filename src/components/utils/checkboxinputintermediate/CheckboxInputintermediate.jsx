import React from "react";

/**
 * A reusable checkbox input component.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.label - The label for the checkbox.
 * @param {string} props.id - The id for the checkbox.
 * @param {string} props.name - The name attribute for the checkbox.
 * @param {boolean} props.checked - Indicates whether the checkbox is checked.
 * @param {Function} props.onChange - Function to call when the checkbox state changes.
 * @returns {JSX.Element} The CheckboxInput component.
 */
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
