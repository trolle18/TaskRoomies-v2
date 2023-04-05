import { getAuth } from "firebase/auth";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db, grouptaskRef } from "../firebase-config";


export default function Checkbox({ task, taskType }) {
  const [checkBool, setCheckBool] = useState(Boolean);
  const taskId = task.id; 
  const auth = getAuth();
  

  async function saveTask(taskToUpdate) {
    if(taskType === "user") {
      const uid = await(auth?.currentUser?.uid)
      const tasksInUserRef = collection(db, `users/${uid}/userTasks/`) 
      const docRef = doc(tasksInUserRef, taskId) 
      await updateDoc(docRef, taskToUpdate)
    }
    if(taskType === "group") {
      const docRef = doc(grouptaskRef, taskId)
      await updateDoc(docRef, taskToUpdate)
    }
  };


  const taskData = { 
    checkBool: checkBool 
  };


  function handleSubmit(e) {   
    saveTask(taskData)
    setCheckBool(e.target.value)
  };


  return (
      <>
        <div className="checkbox-box">
          <input
          type="checkbox"
          name="checkbox"
          className="checkbox"
          id={`check${task.id}`}
          checked={task.checkBool}
          onChange={(e) => handleSubmit(e)}
          />          
        </div>
      </>
  )
};
