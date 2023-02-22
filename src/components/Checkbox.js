import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";


export default function Checkbox({ task }) {
    // const [task, setTask] = useState([]);
    const [checkBool, setCheckBool] = useState(Boolean);
    const taskId = task.id; 
    const navigate = useNavigate();
    const auth = getAuth();


    // async function saveCheckmark(taskToUpdate) {
    //     const uid = await(auth?.currentUser?.uid)
    //     const tasksInUserRef = collection(db, `users/${uid}/userTasks/`) 
    //     await updateDoc(tasksInUserRef, taskToUpdate)
    //     navigate("/");
    // }


    async function saveTask(taskToUpdate) {
        const uid = await(auth?.currentUser?.uid)
        const tasksInUserRef = collection(db, `users/${uid}/userTasks/`) 
        const docRef = doc(tasksInUserRef, taskId) 
        await updateDoc(docRef, taskToUpdate)
        navigate("/")
    }



    const taskData = {
        checkBool: checkBool,
    }



    function handleSubmit( e) {
        setCheckBool(e.target.checkBool)

        e.preventDefault();        
        saveTask(taskData);
    }
    
    console.log("checkBool:", task.checkBool, "", "task:", task.title)
   

    return (
        <>
            <div className="checkbox-box">
                {/* <form className="checkbox-form"> */}

                    <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className={`check${task.id}`}
                    // value={checkBool}
                    checked={checkBool}
                    onChange={(e) => handleSubmit(e)}
                    />
{/* 
                     <input 
                    type="checkbox" 
                    value={checkBool}
                    checked={checkBool}
                    onChange={(e) => setCheckBool(e.target.checkBool)}
                    />
                     */}
                {/* </form> */}
                
            </div>
        </>
    )
};
