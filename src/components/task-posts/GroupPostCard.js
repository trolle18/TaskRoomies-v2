import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "@firebase/firestore";
import { BiCalendarEvent, BiPencil } from "react-icons/bi"
import "./ToDoPostCards.css";
import { grouptaskRef } from "../../firebase-config";


export default function GroupPostCard({ grouptask }) {
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(false);
    const taskCompleted = grouptask.completed;
    const grouptaskId = grouptask.id;


    // When task is clicked, navigate to update page
    function handleClick() {
        navigate(`/groupupdate/${grouptask.id}`);
    }

    // useEffect(() => {
    //         if (grouptask) {   
    //             setCompleted(grouptask.completed);
    //         }
    // }, [grouptask]);


    const handleCheckbox = () => {
        
        const docRef = doc(grouptaskRef, grouptaskId);
        setCompleted(completed => !completed)
        updateDoc(docRef, taskCompleted);
        
    }
    console.log(completed, taskCompleted, grouptaskId);
   
    
    // Sets checkbox state 
        // async function handleCheckbox() {
        //     const docRef = doc(grouptaskRef, grouptask.id);
        //     updateDoc(docRef, !isChecked, grouptask.completed);
        //     console.log(!isChecked, grouptask.id, grouptask.completed)
        // }; 
    
        

    
    return (
        <>          
            <div className="postcard-cntr" key={grouptask.id}>

                <div className="postcard-elem checkbox-elem">
                    <div className="checkbox-box">
                        <input 
                            type="checkbox" 
                            name="checkbox" 
                            checked={completed}
                            onChange={handleCheckbox}
                            className="checkbox-input"
                        />
                    </div>
                </div>

                <div className="postcard-elem todo-elem">
                    <label className="todo-text">
                        <div className="todo-text-title">
                            <h3>{grouptask.title}</h3>
                            <p> {completed ? "completed" : "pending..."}</p>
                        </div>
                        <div className="todo-text-details">
                            <p>{grouptask.person}</p>
                            <p><BiCalendarEvent/> {grouptask.date}</p>
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