import { getAuth } from "firebase/auth";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { db, grouptaskRef } from "../firebase-config";


export default function Checkbox({ task, taskType }) {
  const [checkBool, setCheckBool] = useState(Boolean);
  const taskId = task.id; 
  // const navigate = useNavigate();
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

  
// useEffect(() => {
//   function ifChecked(task) {
//     // const checked = task?.checkBool
//     const checked = document.getElementsByClassName("checkbox")
//     const todoTask = document.getElementsByClassName("setCheck")
//     if(checked) {
//       if(checked === true) {
//         // todoTask.classList.remove("unchecked")
//         todoTask.classList.add("checked")
//       }
//       else if (checked === false) { 
//         todoTask.classList.remove("checked")
//         // todoTask.classList.add("unchecked")
//       }
//     }
//   }
//   console.log(task.checkBool)
//   ifChecked()
// }, [])


  const taskData = { 
    checkBool: checkBool 
  };


  function handleSubmit(e) {
    e.preventDefault()
    setCheckBool(e.target.value)
    saveTask(taskData)
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
