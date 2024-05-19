const TextAreaInput = ({ label, id, value, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        className="form-control"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextAreaInput;
