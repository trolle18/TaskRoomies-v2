import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiPencil } from "react-icons/bi"
import { getTaskDate, getTaskYear } from "../utils/GetDates";


export default function TaskPost({ task }) {
    const navigate = useNavigate(); 
    const [isChecked, setIsChecked] = useState(false);
    
    function handleClick() {
        navigate(`/update-task/${task.id}`);
    } 

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };


    return (
        <>
            <div className="postcard-cntr">

               <div className="checkbox-elem">
                    <div className="checkbox-box">
                        <input 
                            type="checkbox" 
                            name="checkbox" 
                            checked={isChecked}
                            onChange={handleOnChange}
                            className="checkbox-input"
                        />
                    </div>
                </div>

                <div className="todo-text-cntr">
                    <div className="todo-text">
                        <div className="todo-text__title">
                            <span>{task.title}</span>
                        </div>
                        <div className="todo-text__details">
                           <p className="xs-caps">
                                {task.person}
                            </p>
                            <p className="xs-caps">
                                {getTaskDate(task)} {getTaskYear(task)}
                            </p>
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
