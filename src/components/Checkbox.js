import { getAuth } from "firebase/auth";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";


export default function Checkbox({ task }) {
  const [checkBool, setCheckBool] = useState(Boolean);
  const taskId = task.id; 
  const navigate = useNavigate();
  const auth = getAuth();
  

  async function saveTask(taskToUpdate) {
    const uid = await(auth?.currentUser?.uid)
    const tasksInUserRef = collection(db, `users/${uid}/userTasks/`) 
    const docRef = doc(tasksInUserRef, taskId) 
    await updateDoc(docRef, taskToUpdate)
    navigate("/")
  };


  const taskData = { 
    checkBool: checkBool 
  };


  function handleSubmit( e) {
    setCheckBool(e.target.value)
    e.preventDefault()
    saveTask(taskData)
  };


  return (
      <>
        <div className="checkbox-box">
          <input
          type="checkbox"
          name="checkbox"
          id="checkbox"
          className={`check${task.id}`}
          checked={task.checkBool}
          onChange={(e) => handleSubmit(e)}
          />          
        </div>
      </>
  )
};
