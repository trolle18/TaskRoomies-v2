
const InputBlock = ({ inputTitle, inputType, placeholder, pattern, value, onChange }) => {
  return (
    <>
      <div className="flex-cols">

        <span className="bold">
          {inputTitle}
        </span>
        
        <input
        type={inputType}
        placeholder={placeholder}
        pattern={pattern}
        value={value}
        onChange={onChange}
        />
        
      </div>
    </>
  )
};

export default InputBlock;

  