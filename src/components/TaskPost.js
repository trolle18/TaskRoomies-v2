import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiPencil } from "react-icons/bi"
import { getTaskDate, getTaskYear } from "../utils/GetDates";
import { doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { tasksRef, usersRef } from "../firebase-config";
import Checkbox from "./Checkbox";
import Button from "./Button";


export default function TaskPost({ task, taskType, updateUrl }) {
  const [group, setGroup] = useState([]);
  const [check, setCheck] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const taskId = task.id;
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
    // const pers = task.person
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
      setCheck(task.check)           
    }
  }, [task]);
  

  async function handleCheckmark(taskToUpdate) {
    setIsChecked(!isChecked)
    const docRef = doc(tasksRef, taskId);
    await updateDoc(docRef, taskToUpdate); 
    setCheck(check)
  };


  function getDueDate(task) {
    const date = getTaskDate(task)
    const year = getTaskYear(task)
    if(task.date) return ( <> {date} {year} </> )
    else return ("-")
  };


  return (
    <>
      <div className="task-post">
        <div className="checkbox-elem">
          <Checkbox 
          task={task} 
          taskType={taskType}
          handleCheckmark={handleCheckmark}
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
