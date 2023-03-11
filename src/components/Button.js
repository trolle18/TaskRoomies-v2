
export default function Button(props) {
  const { children, color, style, disabled, onClick, className, label, ...rest } = props;
  
  return (
    <button 
    {...rest}
    className={("button", color, style)}
    label={label}
    onClick={onClick} 
    disabled={disabled}
    >
      {children}
    </button>
  )
};
  
