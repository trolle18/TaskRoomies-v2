import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "./Button";


export default function TaskForm({ task, saveTask, handleDelete }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [checkBool, setCheckBool] = useState(Boolean);
  const [type, setType] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDate(task.date)
      setCheckBool(task.checkBool)
      setType(task.type)
    }
  }, [task]);


  const taskData = {
    title: title,
    date: date,
    checkBool: checkBool,
    type: "usertask",
  };


  function handleSubmit(event) {
    event.preventDefault()
    setType(type)
    saveTask(taskData)
    navigate("/")
  };
  

  return (
    <form  className="flex-cols" onSubmit={handleSubmit}>
      <div className="flex-inner-wrapper flex-gap-2">

        <div className="flex-cols flex-gap-1">
          <div className="flex-cols user-details">
            <span className="bold">Task title</span>
            <input
            placeholder="Task..."
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex-cols user-details">
            <span className="bold">Due date</span>
            <input
            type="date"
            pattern="\d{4}-\d{2}-\d{2}"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-rows space-between">
          <Button
          children={ <FaRegTrashAlt/> }
          styleType="btn btn-outline"             
          label="Delete"
          onClick={handleDelete}
          disabled={false}
          />

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

