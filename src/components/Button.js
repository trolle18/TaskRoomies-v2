
export default function Button(props) {
  const { children, color, disabled, onClick, className, label, ...rest } = props;
  
  return (
    <button 
    {...rest}
    className={("button", color)}
    label={label}
    onClick={onClick} 
    disabled={disabled}
    >
      {children}
    </button>
  )
};
  
