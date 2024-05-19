const TextInput = ({ label, id, type = "text", value, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
