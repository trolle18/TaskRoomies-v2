import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "@firebase/firestore";
import { grouptaskRef } from "../firebase-config";
import { FaRegTrashAlt } from "react-icons/fa";
import GroupTaskForm from "../components/GroupTaskForm";
import BackButton from "../components/BackButton";


export default function UpdateGroupTaskPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [grouptask, setGroupTask] = useState({});
  const grouptaskId = params.id;


  useEffect(() => {
    async function getGroupTask() {
      const docRef = doc(grouptaskRef, grouptaskId)
      const docData = await getDoc(docRef)
      setGroupTask(docData.data())
    }
    getGroupTask()
  }, [grouptaskId]);


  async function handleSubmit(taskToUpdate) {
    const docRef = doc(grouptaskRef, grouptaskId)
    await updateDoc(docRef, taskToUpdate)
    navigate("/")
  };


  async function handleDelete() {
    const confirmDelete = window.confirm(`Delete, ${grouptask.title}?`)
    if (confirmDelete) {
      const docRef = doc(grouptaskRef, grouptaskId)
      navigate("/")
      await deleteDoc(docRef)
    }
  };


  return (
    <section className="page">
      <h1>Edit task</h1>
      <BackButton/>

      <section className="form-cntr">
        <GroupTaskForm saveGroupTask={handleSubmit} grouptask={grouptask} />
        
        <button className="trash-btn" onClick={handleDelete}>
          <FaRegTrashAlt/>
        </button>
      </section>
    </section>
  )
};

