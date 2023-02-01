import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiPencil } from "react-icons/bi"
import { getTaskDate, getTaskYear } from "../utils/GetDates";
// import { doc, updateDoc } from "firebase/firestore";
// import { tasksRef } from "../firebase-config";


export default function TaskPost({ saveTask, task }) {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    // const [checked, setChecked] = useState();

    function handleClick() {
        navigate(`/update-task/${task.id}`);
    }

    const handleCheck = () => {
        const todoText = document.getElementById(task.id);
        const title = document.getElementById("title");
        const checkbox = document.getElementById("checkbox");

        checkbox.classList.toggle("true");
        if(isChecked !== true) {
            checkbox.classList.add("checked")
            checkbox.classList.remove("unchecked")

            title.classList.add("checked")
            title.classList.remove("unchecked")

            todoText.classList.add("checked")
            todoText.classList.remove("unchecked")
        }
        else {
            checkbox.classList.add("unchecked")
            checkbox.classList.remove("checked")

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

    





    // const [check, setCheck] = useState(false);

    // useEffect(() => {
    //     if (task) { setCheck(task.check) }
    // }, [task]);

    // const taskData = {
    //     check: check,
    // }
    

    //     // const params = useParams();
    //     const taskId = task.id;
    //     // function saveTask() {
    //         async function saveTask(taskData) {
    //             const docRef = doc(tasksRef, taskId);
    //             await updateDoc(docRef, taskId); 
    //             // navigate("/"); 
    //         }
    //     // }

    // function handleOnChange(event) {
    //     event.preventDefault()

    //     // saveTask(taskData);
    //     setIsChecked(!isChecked)
    //     handleCheck()
    // }

    // ---------------------


    const [check, setCheck] = useState(false);
    useEffect(() => {
        if (task) {
            setCheck(task.check)
        }
    }, [task]);

    const taskData = {
        // id: id,
        check: check,
    };

    
    function handleSave(event) {
        event.preventDefault()

        saveTask(taskData);
        setIsChecked(!isChecked)
        console.log(!isChecked)
        handleCheck()
    }



    return (
        <>
            <div className="task-post">

               <div className="checkbox-elem">
                    <div className="checkbox-box">
                        <input
                            type="checkbox"
                            name="checkbox"
                            id="checkbox"
                            checked={task.check}
                            onChange={handleSave}
                            className="checkbox-input unchecked"
                        />
                    </div>
                </div>

                <div className="todo-text-cntr">
                    <div className="todo-text unchecked" id={task.id}>
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
