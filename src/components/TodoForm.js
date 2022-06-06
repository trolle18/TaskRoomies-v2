import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TodoForm({ saveTask, task }) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (task) {
        setTitle(task.title);
        setDate(task.date);
        }
    }, [task]);

    function handleSubmit(event) {
        event.preventDefault();

        const taskData = {
        title: title,
        date: date,
        };
        saveTask(taskData);
        navigate("/");
    }


    return (
        <form onSubmit={handleSubmit}>
            <label className="taskform_label">
                <input placeholder="Type..." type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>

            {/* <br></br> */}
            {/* <label className="taskform_label">
                <h5>Vil du have en påmindelse?</h5>
                <input placeholder="" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label> */}
            <button type="submit">Save</button>
        </form>
    );
}