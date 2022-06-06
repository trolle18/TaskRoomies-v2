import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import { tasksRef } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "@firebase/firestore";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function UpdatePage() {
    const navigate = useNavigate();
    const params = useParams();
    const [task, setTasks] = useState({}); //useState bruges til at tracke state i komponent. UseState lytter på om der ændres noget. Ses som en variable for en komponent. 
    const taskId = params.id; //url parameter 
    console.log(taskId);

    useEffect(() => {
        async function getTask() {
        const docRef = doc(tasksRef, taskId);
        // laver en doc.reference, fra taskId fra url
        const docData = await getDoc(docRef);//venter på funktionen returnere docref
        setTasks(docData.data());
        }
        getTask();
    }, [taskId]);

    async function handleSubmit(taskToUpdate) {
        const docRef = doc(tasksRef, taskId);
        await updateDoc(docRef, taskToUpdate); //samme som ovenover-ish, funktion til når der gemmes ^^
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
                <AiOutlineArrowLeft size={30} /> <br></br>
            </Link>

            <br></br>

            <TodoForm saveTask={handleSubmit} task={task} />

            <div className="checkbox_delete_container">
                <button onClick={handleDelete}>
                {" "}
                <FaRegTrashAlt size={20} />
                </button>
            </div>

        </section>
    );
}