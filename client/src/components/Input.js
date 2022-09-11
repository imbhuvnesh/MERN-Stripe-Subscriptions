const Input = ({ label, value, setValue, type = "text" }) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text">{label}</span>
      <input
        className="form-control"
        type={type}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default Input;
