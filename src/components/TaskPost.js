import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiPencil } from "react-icons/bi"
import { getTaskDate, getTaskYear } from "../utils/GetDates";
import { doc, updateDoc } from "firebase/firestore";
import { tasksRef } from "../firebase-config";
import Checkbox from "./Checkbox";
import Button from "./Button";


export default function TaskPost({ task, updateUrl }) {
    const navigate = useNavigate();
    const [check, setCheck] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const taskId = task.id;


    function handleClick() {
        navigate(`${updateUrl}${task.id}`);
    }


    function checkPers(task) {
        const pers = task.person
        if(pers) return ( <span className="xs-caps">{task.person}</span> );
    }

    
    useEffect(() => {
        if (task) {
            setCheck(task.check)           
        }
    }, [task]);

    

    async function handleCheckmark(taskToUpdate) {
        setIsChecked(!isChecked)
        const docRef = doc(tasksRef, taskId);
        await updateDoc(docRef, taskToUpdate); 
        setCheck(check)
    };


    function getDueDate(task) {
        const date = getTaskDate(task)
        const year = getTaskYear(task)
        if(task.date) return ( <> {date} {year} </> )
        else return ("-")
    };


    return (
        <>
            <div className="task-post">

                <div className="checkbox-elem">
                    <Checkbox 
                    task={task} 
                    handleCheckmark={handleCheckmark}
                    />
                </div>

                <div className="todo-text-cntr">
                    <div className="todo-text unchecked" id={`todotext${task.id}`}>
                        <div className="todo-text__title unchecked" id="title" >
                            <span>{task.title}</span>
                        </div>
                        <div className="todo-text__details">
                            {checkPers(task)}
                            <span className="xs-caps">
                                {getDueDate(task)} 
                            </span>
                        </div>
                    </div>
                </div>

                <div className="edit-btn">
                    <Button
                    children={ <BiPencil/> }
                    styleType="btn"              
                    label="Edit"
                    onClick={handleClick}
                    disabled={false}
                    />
                </div>

            </div>
        </>
    )
};
