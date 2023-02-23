import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function TaskForm({ saveTask, task }) {
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
    }


    function handleSubmit(event) {
        setType(type)
        event.preventDefault();

        saveTask(taskData);
        navigate("/");
    }
    

    return (
        <form onSubmit={handleSubmit}>

            {/* <input 
            type="checkbox" 
            value={checkBool}
            checked={checkBool}
            onChange={(e) => setCheckBool(e.target.checkBool)}
            /> */}

            <div>
                <span>Task Title</span>
                <input
                placeholder="Task..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <span>Due date</span>
                <input
                type="date"
                pattern="\d{4}-\d{2}-\d{2}"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
            </div>

            <button type="submit" className="submit-btn">Save</button>
        </form>
    );
}