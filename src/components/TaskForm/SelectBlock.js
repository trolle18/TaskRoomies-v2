
const SelectBlock = ({ inputTitle, value, group, onChange }) => {
  return (
    <>
      <div className="flex-cols">

        <span className="bold">
          {inputTitle}
        </span>

        <select value={value} onChange={onChange} >
          <option>Choose</option>
          <option value="fælles">Fælles</option>
          {group.map((person, i) => (
            <option 
            key={i}
            value={person.uid}
            >
              {person.name}
            </option>
          ))}
        </select>

      </div>
    </>
  )
};

export default SelectBlock;

  