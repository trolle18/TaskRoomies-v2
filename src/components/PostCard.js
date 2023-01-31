import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiCalendarEvent, BiPencil } from "react-icons/bi"


export default function PostCard({ task }) {
    const navigate = useNavigate(); 
    const [isChecked, setIsChecked] = useState(false);
    
    function handleClick() {
        navigate(`/update-task/${task.id}`);
    } 

    const handleOnChange = () => {
        setIsChecked(!isChecked);
        console.log(!isChecked, task.id)
    };

    function getDate(task) {
        const options = {month: 'long', day: '2-digit' }
        const date = task.date;
        const setDate = new Date(date).toLocaleDateString('en-GB', options)
        return setDate
    }

    function getWeekday(task) {
        const options = { weekday: 'long' }
        const date = task.date;
        const setDate = new Date(date).toLocaleDateString('en-GB', options)
        return setDate
    }



    return (
        <>
            <div className="postcard-cntr">

               <div className="postcard-elem checkbox-elem">
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

                <div className="postcard-elem todo-elem">
                    <label className="todo-text">
                        <div className="todo-text__title">
                            <h3>{task.title}</h3>
                            {/* <p> {isChecked ? "completed" : "pending..."}</p> */}
                        </div>
                        <div className="todo-text__details">
                           <p>{task.person}</p>
                            <div className="todo-text__details__date">
                                {/* <BiCalendarEvent/>  */}
                                <p className="">{getDate(task)}</p>
                                <p className="weekday">{getWeekday(task)}</p>
                            </div>
                           
                        </div>
                        
                    </label>
                </div>

                <div className="updt-elem">
                    <button onClick={handleClick}>
                        <BiPencil />
                    </button>
                </div>

            </div>
        </>
    );
};
