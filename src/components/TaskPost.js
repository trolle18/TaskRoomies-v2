import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiPencil } from "react-icons/bi"
import { getDueDate, isOverdue } from "../utils/GetDates";
import {getDocs, query } from "firebase/firestore";
import {  usersRef } from "../firebase-config";
import Checkbox from "./Checkbox";
import Button from "./Button";
import SmallAvatar from "./SmallAvatar";


export default function TaskPost({ task, taskType, updateUrl }) {
  const [group, setGroup] = useState([]);
  const navigate = useNavigate();


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

  
  // Link to update page
  function handleClick() {
    navigate(`${updateUrl}${task.id}`);
  };
  

  // If The task is a grouptask, add user imgs 
  function checkTaskType(task, taskType) {
    const taskUid = task.uid
    if(taskType === "group") {
      return( 
        <>
          {group
          .filter((user) => user.uid === taskUid || user.name === task.person) 
          .map((user) => { 
            return (
              <SmallAvatar key={task.uid} user={user} />
            )
          })}
        </>
      )
    }
  };

  
  function ifChecked() {
    const checked = task?.checkBool
    if(checked) { return "checked" }
  };


  return (
    <>
      <div className="task-post">
        <div className="checkbox-elem">
          <Checkbox 
          task={task} 
          taskType={taskType}
          />
        </div>

        <div className="todo-text-cntr">
          <div className={`todo-text setCheck ${ifChecked()}`} id={`todotext${task.id}`}>
            <div className="todo-text__title" id="title" >
              <span>{task.title}</span>
            </div>

            <div className="todo-text__details">
              {checkTaskType(task, taskType)}
              <span className={`xs-caps ${ifChecked()} ${isOverdue(task)}`}>
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
