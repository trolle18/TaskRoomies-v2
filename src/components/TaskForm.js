import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function TaskForm({ saveTask, task }) {
    const [title, setTitle] = useState("");
    const [check, setCheck] = useState(false);
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDate(task.date);
            setCheck(task.check)
        }
    }, [task]);

    function handleSubmit(event) {
        event.preventDefault();

        const taskData = {
            title: title,
            check: check,
            date: date,
        };
        saveTask(taskData);
        navigate("/");
    }

    

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" value={check}/>

            <div>
                <input
                placeholder="Task..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <p>When?</p>
                <input
                type="date"
                pattern="\d{4}-\d{2}-\d{2}"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
            </div>

            <button type="submit">Save</button>
        </form>
    );
}