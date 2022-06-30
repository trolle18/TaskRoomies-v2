import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "@firebase/firestore";
import { BiCalendarEvent, BiPencil } from "react-icons/bi"
import "./ToDoPostCards.css";
import { grouptaskRef } from "../../firebase-config";


export default function GroupPostCard({ grouptask }) {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    // const [completed, setCompleted] = useState(false);

    // When task is clicked, navigate to update page
    function handleClick() {
        navigate(`/groupupdate/${grouptask.id}`);
    }


    
    // Sets checkbox state 
    async function handleCheckbox() {
        const docRef = doc(grouptaskRef, grouptask.id);

        setIsChecked(!isChecked, grouptask.completed); 
        await updateDoc(docRef, !isChecked, grouptask.completed);
 
        console.log(!isChecked, grouptask.id, grouptask.completed)
    };

    // async function handleCheckbox(completed) {
    //     setIsChecked(!isChecked);
    //     console.log(!isChecked, grouptask.id, grouptask.completed)

    //     const docRef = doc(grouptaskRef, grouptask.id);
    //     await updateDoc(docRef, completed); 
    // }

    // useEffect(() => {
    //     async function getTask() {
    //         const docRef = doc(grouptaskRef, grouptask.id);
    //         const docData = await getDoc(docRef);
    //         setTasks(docData.data());
    //     }
    //     getTask();
    // }, [grouptask.id]);


    // async function handleCheckbox(taskToUpdate) {
    //     setIsChecked(!isChecked);
    //     const docRef = doc(grouptaskRef, grouptask.id);
    //     await updateDoc(docRef, taskToUpdate); 
    //     console.log(!isChecked, grouptask.id, grouptask.completed)
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
                            onChange={handleCheckbox}
                            className="checkbox-input"
                        />
                    </div>
                </div>

                <div className="postcard-elem todo-elem">
                    <label className="todo-text">
                        <div className="todo-text-title">
                            {/*<div className="todo-img">
                                 <img src={couchIcon} alt="" /> 
                            </div>*/}
                            <h3>{grouptask.title}</h3>
                            <p> {isChecked ? "completed" : "pending..."}</p>
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