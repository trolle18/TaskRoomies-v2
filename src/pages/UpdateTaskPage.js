import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc, collection} from "@firebase/firestore";
import { db } from "../firebase-config";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import TaskForm from "../components/TaskForm";
import { getAuth } from "firebase/auth";
import Button from "../components/Button";


export default function UpdateTaskPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const params = useParams();
  const [task, setTasks] = useState({}); 
  const taskId = params.id; 

  useEffect(() => {
    async function getTask() {
      const uid = await(auth?.currentUser?.uid)
      const tasksInUserRef = collection(db, `users/${uid}/userTasks/`) 
      const docRef = doc(tasksInUserRef, taskId)
      const docData = await getDoc(docRef)
      setTasks(docData.data())
    }
    getTask()
  }, [auth?.currentUser?.uid, taskId])


  async function saveTask(taskToUpdate) {
    const uid = await(auth?.currentUser?.uid)
    const tasksInUserRef = collection(db, `users/${uid}/userTasks/`) 
    const docRef = doc(tasksInUserRef, taskId) 
    await updateDoc(docRef, taskToUpdate)
    navigate("/")
  }


  async function handleDelete() {
    const confirmDelete = window.confirm(`Delete task "${task.title}"?`)
    if (confirmDelete) {
      const uid = await(auth?.currentUser?.uid)
      const tasksInUserRef = collection(db, `users/${uid}/userTasks/`) 
      const docRef = doc(tasksInUserRef, taskId) 
      await deleteDoc(docRef)
      navigate("/")
    }
  }


  return (
    <section className="page">
      <h1>Edit task</h1>
      <Link to="/">
          <AiOutlineArrowLeft size={30} /> 
      </Link>
      
      <section className="form-cntr">
          <TaskForm 
          task={task}
          saveTask={saveTask}
          handleDelete={handleDelete}
          />
      </section>

      {/* <div className="checkbox_delete_container"> */}
          {/* <button onClick={handleDelete}>
              <FaRegTrashAlt size={20} />
          </button> */}

          {/* <Button
          children={ <FaRegTrashAlt/> }
          styleType="edit-btn circle-icon-btn"             
          label="Delete"
          onClick={handleDelete}
          disabled={false}
          /> */}
      {/* </div> */}
    </section>
  )
};

