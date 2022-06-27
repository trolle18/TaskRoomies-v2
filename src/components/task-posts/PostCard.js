import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiCalendarEvent } from "react-icons/bi"
import couchIcon from "../../assets/icons/couch-solid.svg";
import "./ToDoPostCards.css";


export default function PostCard({ task }) {
    const navigate = useNavigate(); 
    const [complete, setComplete] = useState(false);
    
    function handleClick() {
        navigate(`/update/${task.id}`);
    } 

    const handleOnChange = () => {
        setComplete(!complete);
        console.log(!complete, task.id)
    };

    // const complete = () => {

    // }

    
    return (
        <>
            <div className="postcard-cntr">

               <div className="postcard-elem checkbox-elem">
                    <div className="checkbox-box">
                        <input 
                            type="checkbox" 
                            name="checkbox" 
                            checked={complete}
                            onChange={handleOnChange}
                            className="checkbox-input"
                        />
                    </div>
                </div>

                <div className="postcard-elem todo-elem" onClick={handleClick}>
                     <label className="todo-text">

                        <div className="todo-text-title">
                            <div className="todo-img">
                                <img src={couchIcon} alt="" />
                            </div>
                            <h3>{task.title}</h3>
                            <p> {complete ? "completed" : "pending..."}</p>
                        </div>

                        <div className="todo-text-details">
                            <p>{task.person}</p>
                            <p><BiCalendarEvent/> {task.date}</p>
                        </div>
                        
                    </label>
                </div>

            </div>
        </>
    );
}