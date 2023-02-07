import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Checkbox({ handleCheckmark, task }) {
    const [check, setCheck] = useState(false);
    const navigate = useNavigate();
    // const taskId = task.id;

    // const handleCheck = () => {
    //     const checkbox = document.getElementById(`check${task.id}`);

    //     if(checkbox === true) {
    //         return task.check = false
    //     }
    //     else if (checkbox === false) {
    //         return task.check = true
    //     }
    // }


    useEffect(() => {
        if (task) {
            setCheck(task.check)
        }
    }, [task]);

    
    function handleSave(event) {
        event.preventDefault()
        // handleCheck()
        const taskData = { 
            check: check 
        }
        handleCheckmark(taskData)
        navigate("/")
    }



    return (
        <>
            <div className="checkbox-box">
                <form className="checkbox-form">
                    <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    // checked={check}
                    onChange={handleSave}
                    value={check}
                    className={`check${task.id} ${check}`}
                />
                </form>
                
            </div>
        </>
    )
};
