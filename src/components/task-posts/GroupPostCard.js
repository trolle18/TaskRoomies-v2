import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiCalendarEvent } from "react-icons/bi"
import couchIcon from "../../assets/icons/couch-solid.svg";
import "./ToDoPostCards.css";


export default function GroupPostCard({ grouptask }) {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    // When task is clicked, navigate to update page
    function handleClick() {
        navigate(`/groupupdate/${grouptask.id}`);
    }
    
    // Sets checkbox state 
    const handleOnChange = () => {
        setIsChecked(!isChecked);
        console.log(!isChecked, grouptask.id)
    };
    
    // async function handleSubmit(taskToUpdate) {
    //     const docRef = doc(grouptaskRef, grouptaskId);
    //     await updateDoc(docRef, taskToUpdate);
    //     navigate("/");
    // } 

    
    return (
        <>          
            <div className="postcard-cntr" key={grouptask.id}>

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

                <div className="postcard-elem todo-elem" onClick={handleClick}>
                    <label className="todo-text">
                        <div className="todo-text-title">
                            <div className="todo-img">
                                <img src={couchIcon} alt="" />
                            </div>
                            <h3>{grouptask.title}</h3>
                            <p> {isChecked ? "completed" : "pending..."}</p>
                        </div>
                        <div className="todo-text-details">
                            <p>{grouptask.person}</p>
                            <p><BiCalendarEvent/> {grouptask.date}</p>
                        </div>
                        
                    </label>
                </div>

            </div>
        </>
    );
}