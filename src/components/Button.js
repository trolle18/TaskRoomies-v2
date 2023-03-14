
export default function Button(props) {
  const { children, classNames, styleType, type, label, onClick, disabled, ...rest } = props;

  return (
    <button
    {...rest}
    className={(classNames, styleType)}
    type={type}
    label={label}
    onClick={onClick}
    disabled={disabled}
    >
      {children}
    </button>
  )
};

