
export default function Button(props) {
  const { children, styleType, type, label, onClick, disabled, ...rest } = props;

  return (
    <button
    {...rest}
    className={(styleType)}
    type={type}
    label={label}
    onClick={onClick}
    disabled={disabled}
    >
      {children}
    </button>
  )
};

