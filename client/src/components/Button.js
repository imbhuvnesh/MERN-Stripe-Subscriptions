const Button = ({
  type = "primary",
  size = "md",
  text = "Submit",
  handleClick,
  disabled = false,
}) => {
  return (
    <button
      className={`btn btn-${type} btn-${size}`}
      type={text}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
