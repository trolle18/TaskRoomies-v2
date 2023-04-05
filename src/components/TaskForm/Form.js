import { useState } from "react";
import Button from "../Button";
import InputBlock from "./InputBlock";
import SelectBlock from "./SelectBlock";


export default function Form({ handleSubmit, group }) {  
  const [title, setTitle] = useState("");
  const [person, setPerson] = useState("");
  const [date, setDate] = useState("");
  
  return (
    <form  className="flex-cols" onSubmit={handleSubmit}>
      <div className="flex-inner-wrapper flex-gap-2">

        <div className="flex-cols flex-gap-1">
          <InputBlock
          inputTitle={"Task title"}
          inputType={"text"}
          placeholder={"Create a task title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />

        {group && (
          <SelectBlock
          inputTitle={"Who's doing the task?"}
          value={person}
          group={group}
          onChange={(e) => setPerson(e.target.value)}
          />
        )}

          <InputBlock
          inputTitle={"Due date"}
          inputType={"date"}
          pattern={"d{4}-d{2}-d{2}"}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex-rows space-between">
          <Button
          children="Save"
          type="submit"
          styleType="btn"
          label="Save"
          disabled={false}
          />
        </div>
      
      </div>
    </form>
  )
};

