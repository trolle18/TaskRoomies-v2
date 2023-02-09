import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc, collectionGroup, query, onSnapshot } from "@firebase/firestore";
import { db, tasksRef, usersRef } from "../firebase-config";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import TaskForm from "../components/TaskForm";
import { getAuth } from "firebase/auth";


export default function UpdateTaskPage() {
    const navigate = useNavigate();
    const params = useParams();
    const [task, setTasks] = useState({}); 
    const taskId = params.id; 
    const auth = getAuth();

    // useEffect(() => {
    //     async function getTask() {
    //         const docRef = doc(tasksRef, taskId)
    //         const docData = await getDoc(docRef)
    //         setTasks(docData.data())
    //     }
    //     getTask()
    // }, [taskId]);


    // async function handleSubmit(taskToUpdate) {
    //     const docRef = doc(tasksRef, taskId)
    //     await updateDoc(docRef, taskToUpdate)
    //     navigate("/")
    // };

    // async function handleDelete() {
    //     const confirmDelete = window.confirm(`Delete, ${task.title}?`)
    //     if (confirmDelete) {
    //         const docRef = doc(tasksRef, taskId)
    //         await deleteDoc(docRef)
    //         navigate("/")
    //     }
    // };
    
    
    
    
    // --------------------------------------------------------



    useEffect(() => {
        async function getTask() {
            const docRef = doc(tasksRef, taskId)
            const docData = await getDoc(docRef)
            setTasks(docData.data())
        }
        getTask()
    }, [taskId]);

    // useEffect(() => {
    //     async function getTask() {
    //         const docRef = doc(db, 'userTasks', taskId)
    //         const docData = await getDoc(docRef)
            

    //         const q = query(collectionGroup(db, 'userTasks', taskId))
    //         const unsubscribe = onSnapshot(q, (data) => {
    //             const taskData = data.docs
    //             .filter((doc) => doc.id.includes(taskId) )
    //             .map((doc) => {
    //                 return { ...doc.data(), id: doc.id, uid: doc.uid }
    //             })
    //             console.log(taskData, taskId)
    //             // setTasks(taskData)
    //         })
    //         // return () => unsubscribe()
            
    //         setTasks(docData.data())
    //     }
    //     getTask()
    // }, [taskId]);


    async function handleSubmit(taskToUpdate) {
        const docRef = doc(tasksRef, taskId)
        await updateDoc(docRef, taskToUpdate)
        navigate("/")
    };

    async function handleDelete() {
        const confirmDelete = window.confirm(`Delete, ${task.title}?`)
        if (confirmDelete) {
            const docRef = doc(tasksRef, taskId)
            await deleteDoc(docRef)
            navigate("/")
        }
    };


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
    )
};
