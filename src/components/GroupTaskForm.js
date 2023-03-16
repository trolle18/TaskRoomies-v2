import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, query, orderBy } from "@firebase/firestore";
import { usersRef } from "../firebase-config";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "./Button";


export default function GroupTaskForm({ saveGroupTask, grouptask }) {
  const [group, setGroup] = useState([]);
  const [title, setTitle] = useState("");
  const [person, setPerson] = useState("");
  const [date, setDate] = useState("");
  const [checkBool, setCheckBool] = useState(Boolean);
  // const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (grouptask) {   
      setTitle(grouptask.title)
      setPerson(grouptask.person)
      setDate(grouptask.date)
      setCheckBool(grouptask.checkBool)
      // setCompleted(grouptask.completed)
      
    }
  }, [grouptask]);


  const grouptaskData = { 
    title: title,
    person: person,
    date: date,
    checkBool: checkBool,
    // completed: completed,
  };


  function handleSubmit(event) {
    event.preventDefault()
    saveGroupTask(grouptaskData)
    navigate("/")
  };


  // Get groupmembers
  useEffect(() => {
    async function getGroup() {
      const q = query(usersRef, orderBy("name"))
      const data = await getDocs(q)
      const groupData = data.docs.map(doc => {
        return { ...doc.data(), id: doc.id } // changing the data structure so it's all gathered in one object
      })
      setGroup(groupData)
    }
    getGroup()
  }, []);


  return (
    <>
      <form className="flex-cols" onSubmit={handleSubmit}>
        <div className="flex-inner-wrapper flex-gap-2">

          <div className="flex-cols flex-gap-1">
            <div className="flex-cols">
              <span className="bold">Task title</span>
              <input
              placeholder="Task..."
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex-cols flex-gap-0">
              <span className="bold">Who's doing the task?</span>
              <select value={person} onChange={(e) => setPerson(e.target.value)} >
                <option>Choose</option>
                <option value="fælles">Fælles</option>
                {group.map(person => (
                  <option value={person.uid} key={person.uid}>{person.name}</option>
                ))}
              </select>
            </div>

            <div className="flex-cols">
              <span className="bold">Due date</span>
              <input
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              />
            </div>  
          </div>

          <div className="flex-rows space-between">
            <Button
            children="Save"
            type="submit"
            styleType="btn"
            label="Save"
            disabled={false}
            />
          </div>

        </div>
      </form>
    </>
  )
};

