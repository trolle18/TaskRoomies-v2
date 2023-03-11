
export default function Button(props) {
  const { children, color, disabled, onClick, className, ...rest } = props;
  
  return (
    <button 
    {...rest}
    className={("button", color, disabled)}
    onClick={onClick} 
    disabled={disabled}
    >
      {/* <span className="button__text"> */}
      {children}
      {/* </span> */}
    </button>
  )
};
  
