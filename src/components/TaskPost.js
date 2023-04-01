import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiPencil } from "react-icons/bi"
import { getTaskDate, getTaskYear } from "../utils/GetDates";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { db, grouptaskRef, tasksRef, usersRef } from "../firebase-config";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { getAuth } from "firebase/auth";


export default function TaskPost({ task, taskType, updateUrl }) {
  const [group, setGroup] = useState([]);
  const [checkBool, setCheckBool] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const taskId = task.id;
  const auth = getAuth();
  const navigate = useNavigate();


  // Link to update page
  function handleClick() {
    navigate(`${updateUrl}${task.id}`);
  };

  // Get groupmembers
  useEffect(() => {
    async function getGroup() {
      const q = query(usersRef)
      const data = await getDocs(q)
      const groupData = data.docs.map(doc => {
        return { ...doc.data(), id: doc.id } // changing the data structure so it's all gathered in one object
      })
      setGroup(groupData)
    }
    getGroup()
  }, []);


  // If The task is a grouptask, add user imgs 
  function checkTaskType(task, taskType) {
    const taskUid = task.uid
    if(taskType === "group") {
      return ( 
        <div>
          {group
          .filter((user) => user.uid === taskUid || user.name === task.person) 
          .map((user) => { 
            return (
              <div className="btn-cntr  circle-btn-cntr" key={task.uid}>
                <div className="btn-label">
                  <span className="btn-label__text xs-caps">
                    {user.name}
                  </span>
                </div>
                <div className="img-circ-cntr">
                  <div className="img-inner-cntr">
                    <img src={user.image} alt={user.name} />
                  </div>
                </div> 
              </div>
            )
          })}
        </div>
      )
    }
  };

  
  useEffect(() => {
    if (task) {
      setCheckBool(task.checkBool)           
    }
  }, [task]);
  

  async function handleCheckmark(taskToUpdate) {
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


  function getDueDate(task) {
    const date = getTaskDate(task)
    const year = getTaskYear(task)
    if(task.date) return ( <> {date} {year} </> )
    else return ("-")
  };
 

  function handleSubmit(e) {
    const taskData = { 
      checkBool: checkBool 
    };

    setCheckBool(e.target.value)
    handleCheckmark(taskData)
  };

  return (
    <>
      <div className="task-post">
        <div className="checkbox-elem">
          <Checkbox 
          task={task} 
          taskType={taskType}
          onChange={handleSubmit}
          />
        </div>

        <div className="todo-text-cntr">
          <div className="todo-text unchecked" id={`todotext${task.id}`}>
            <div className="todo-text__title unchecked" id="title" >
              <span>{task.title}</span>
            </div>

            <div className="todo-text__details">
              {/* {checkPers(task)} */}
              {checkTaskType(task, taskType)}
              <span className="xs-caps">
                {getDueDate(task)} 
              </span>
            </div>

          </div>
        </div>

        <div className="edit-btn">
          <Button
          children={ <BiPencil/> }
          styleType="btn"              
          label="Edit"
          onClick={handleClick}
          disabled={false}
          />
        </div>

      </div>
    </>
  )
};
