import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { onSnapshot, query, orderBy, addDoc, serverTimestamp, collection, doc } from "@firebase/firestore";
import { db } from "../firebase-config";
import { AiOutlineArrowLeft, AiOutlineShoppingCart } from "react-icons/ai";
import TaskForm from "../components/TaskForm";
import TaskPost from "../components/TaskPost";


export default function CreateTaskPage() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const auth = getAuth();


    useEffect(() => {
        async function getUserTasks() {
          const uid = await(auth?.currentUser?.uid)
          const tasksInUserRef = collection(db, `users/${uid}/userTasks`) // ref to nested collection in the user:
          const q = query(tasksInUserRef, orderBy("createdAt")) // order / limit etc them
          const unsubscribe = onSnapshot(q, (data) => {    // Refers to query instead of db-Ref, which returns filtered results - Unsub enables ability to watch components from a different page
            const taskData = data.docs.map((doc) => {
              return { ...doc.data(), id: doc.id, uid: doc.uid }  // Gets data from firebase (...doc.data) and with id: doc.id Z
            })
            setTasks(taskData)
          })
          return () => unsubscribe()
        }
        getUserTasks()
      }, [auth?.currentUser?.uid])
    

    async function saveTask(newTask) {
        newTask.createdAt = serverTimestamp(); // timestamp (now)
        newTask.uid = auth.currentUser.uid; // user-id of auth user / signed in user
        const uid = await(auth?.currentUser?.uid)
        const tasksInUserRef = collection(db, `users/${uid}/userTasks/`) 
        const docRef = tasksInUserRef 
        await addDoc(docRef, newTask)
        navigate("/")
    }


    return (
        <section className="page">
            <section className="card">
                <Link to="/">
                    <AiOutlineArrowLeft size={30} /> 
                </Link>
                <div className="page-title">
                    {/* <AiOutlineShoppingCart/> */}
                    <h2>Create new task</h2>
                </div>
                <section className="form-cntr">
                    <TaskForm saveTask={saveTask} />
                </section>
            </section>

            <section className="grid-cntr">
                <div className="task-cntr">
                    <div className="title-box">
                        <h4 className="cntr-title">
                            Tasks
                        </h4>  
                    </div> 
                    <div className="task-posts-cntr">
                        {tasks?.map( (task) => (
                            <TaskPost task={task} key={task.id} 
                            // updateUrl={updateUrl} 
                            /> 
                        ))}
                    </div>
                </div>
            </section>
        </section>
    )
};
