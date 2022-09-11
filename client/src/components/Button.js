const Button = ({ type = "primary", size = "md", text = "Submit", handleClick }) => {
  return (
    <button className={`btn btn-${type} btn-${size}`} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
