
export default function Button(props) {
  const { children, color, styleType, type, disabled, onClick, className, label, ...rest } = props;
  
  return (
    <button 
    {...rest}
    className={("button", color, styleType)}
    type={type}
    label={label}
    onClick={onClick} 
    disabled={disabled}
    >
      {children}
    </button>
  )
};
  
