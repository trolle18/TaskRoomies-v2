import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Checkbox({ saveTask, task }) {
    const [check, setCheck] = useState(false);
    const navigate = useNavigate();
    // const taskId = task.id;

    const handleCheck = () => {
        const checkbox = document.getElementById(`check${task.id}`);

        if(checkbox === true) {
            return task.check = false
        }
        else if (checkbox === false) {
            return task.check = true
        }
    }


    useEffect(() => {
        if (task) {
            setCheck(task.check)
        }
    }, [task]);

    
    function handleSave(event) {
        event.preventDefault()
        handleCheck()
        const taskData = { 
            check: check 
        }
        saveTask(taskData)
        navigate("/")
    }



    return (
        <>
            <div className="checkbox-box">
                <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    checked={check}
                    onChange={handleSave}
                    value={check}
                    className={`check${task.id}`}
                />
            </div>
        </>
    )
};
