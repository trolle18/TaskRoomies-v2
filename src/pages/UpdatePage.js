import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "@firebase/firestore";
import { tasksRef } from "../firebase-config";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import TaskForm from "../components/TaskForm";

export default function UpdatePage() {
    const navigate = useNavigate();
    const params = useParams();
    const [task, setTasks] = useState({}); 
    const taskId = params.id; 
    // console.log(taskId);

    useEffect(() => {
        async function getTask() {
            const docRef = doc(tasksRef, taskId);
            const docData = await getDoc(docRef);
            setTasks(docData.data());
        }
        getTask();
    }, [taskId]);


    async function handleSubmit(taskToUpdate) {
        const docRef = doc(tasksRef, taskId);
        await updateDoc(docRef, taskToUpdate); 
        navigate("/"); 
    }

    async function handleDelete() {
        const confirmDelete = window.confirm(`Delete, ${task.title}?`);  
        if (confirmDelete) {
            const docRef = doc(tasksRef, taskId);
            await deleteDoc(docRef);
            navigate("/");
        }
    }



    return (
        <section className="page">
            
            <h1>Edit task</h1>
            <Link to="/">
                <AiOutlineArrowLeft size={30} /> 
            </Link>
            
            <section className="form-cntr">
                <TaskForm saveTask={handleSubmit} task={task} />
            </section>

            <div className="checkbox_delete_container">
                <button onClick={handleDelete}>
                <FaRegTrashAlt size={20} />
                </button>
            </div>

        </section>
    );
}