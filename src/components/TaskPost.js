import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiPencil } from "react-icons/bi"
import { getTaskDate, getTaskYear } from "../utils/GetDates";
import { doc, updateDoc } from "firebase/firestore";
import { tasksRef } from "../firebase-config";
import Checkbox from "./Checkbox";


export default function TaskPost({ task }) {
    const navigate = useNavigate();
    const [check, setCheck] = useState(false);
    const [isChecked, setIsChecked] = useState(false);


    function handleClick() {
        navigate(`/update-task/${task.id}`);
    }

    const handleCheck = () => {
        const todoText = document.getElementById(`todotext${task.id}`);
        const title = document.getElementById("title");
        const taskCheck = task.check

        if(taskCheck === true) {
            title.classList.add("checked")
            title.classList.remove("unchecked")
            todoText.classList.add("checked")
            todoText.classList.remove("unchecked")
        }
        else if (taskCheck === false) {
            title.classList.add("unchecked")
            title.classList.remove("checked")
            todoText.classList.add("unchecked")
            todoText.classList.remove("checked")
        }
    }

    function checkPers(task) {
        const pers = task.person
        if(pers) return ( <span className="xs-caps">{task.person}</span> );
    }


    
    useEffect(() => {
        if (task) {
            handleCheck()
            setCheck(task.check)           
        }
    }, [task]);

    

    const taskId = task.id;
    async function handleCheckmark(taskToUpdate) {
        setIsChecked(!isChecked)
        const docRef = doc(tasksRef, taskId);
        await updateDoc(docRef, taskToUpdate); 
        setCheck(check)

        console.log(taskId, taskToUpdate)
    }


    return (
        <>
            <div className="task-post">

                <div className="checkbox-elem">
                    <Checkbox task={task} handleCheckmark={handleCheckmark}/>
                </div>

                <div className="todo-text-cntr">
                    <div className="todo-text unchecked" id={`todotext${task.id}`}>
                        <div className="todo-text__title unchecked" id="title" >
                            <span>{task.title}</span>
                        </div>
                        <div className="todo-text__details">
                            {checkPers(task)}
                            <span className="xs-caps">
                                {getTaskDate(task)} {getTaskYear(task)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="edit-btn">
                    <button onClick={handleClick}>
                        <BiPencil />
                    </button>
                </div>

            </div>
        </>
    )
};
