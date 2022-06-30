import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiCalendarEvent, BiPencil } from "react-icons/bi"
import couchIcon from "../../assets/icons/couch-solid.svg";
import "./ToDoPostCards.css";


export default function PostCard({ task }) {
    const navigate = useNavigate(); 
    const [isChecked, setIsChecked] = useState(false);
    
    function handleClick() {
        navigate(`/update/${task.id}`);
    } 

    const handleOnChange = () => {
        setIsChecked(!isChecked);
        console.log(!isChecked, task.id)
    };


    
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
                        <div className="todo-text-title">
                            {/* <div className="todo-img">
                                 <img src={couchIcon} alt="" /> 
                            </div> */}
                            <h3>{task.title}</h3>
                            <p> {isChecked ? "completed" : "pending..."}</p>
                        </div>
                        <div className="todo-text-details">
                            <p>{task.person}</p>
                            <p><BiCalendarEvent/> {task.date}</p>
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
}