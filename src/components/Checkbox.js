import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";


export default function Checkbox({ task }) {
    const [check, setCheck] = useState();
    const navigate = useNavigate();
    const auth = getAuth();


    // function isCheck(task) {
    //     if (task.check) {                
    //         if (task.checked === true) return "checked"
    //         if (task.checked === undefined) return false
    //         if (task.checked === false) return "unchecked"
    //         else return "unchecked"
    //     }
    //     setCheck(task.check)
    // }


    async function saveCheckmark(newTask) {
        const uid = await(auth?.currentUser?.uid)
        const tasksInUserRef = collection(db, `users/${uid}/userTasks/`) 
        newTask.createdAt = serverTimestamp(); // timestamp (now)
        newTask.uid = auth.currentUser.uid; // user-id of auth user / signed in user
        await addDoc(tasksInUserRef, newTask); // Posts input to homepage
        navigate("/");
    }


    function Set(e) {
        if(task.check) {
            if(task.check === "undefined") return false
            setCheck(check)
        }
        // return (e) => setCheck(e.target.check)
    }

    function handleSubmit() {
        Set()
        // event.preventDefault();

        const taskData = {
            check: check,
        };
        saveCheckmark(taskData);
        // navigate("/");
    }
    
    console.log(task.check)
   

    return (
        <>
            <div className="checkbox-box">
                <form className="checkbox-form">
                    <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    checked={check}
                    // checked={isCheck(task)}
                    // onChange={handleSave}
                    onChange={ handleSubmit }
                    value={check}
                    className={`check${task.id}`}
                />
                </form>
                
            </div>
        </>
    )
};
