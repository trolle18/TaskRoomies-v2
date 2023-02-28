import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { onSnapshot, query, collection, orderBy } from "@firebase/firestore";
import { db } from "../firebase-config";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md"
import TaskPost from "../components/TaskPost";
import 'firebase/database';


export default function UserTasks() {
    const auth = getAuth();
    const [tasks, setTasks] = useState([]); 
   

    useEffect(() => {
            async function getUserTasks() {
            const uid = await(auth?.currentUser?.uid)
            const tasksInUserRef = collection(db, `users/${uid}/userTasks`) // ref to nested collection in the user:
            const q = query(tasksInUserRef, orderBy("createdAt")) // order / limit etc them
            const unsubscribe = onSnapshot(q, (data) => {    // Refers to query instead of db-Ref, which returns filtered results - Unsub enables ability to watch components from a different page
                const taskData = data.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id, uid: doc.uid  }  // Gets data from firebase (...doc.data) and with id: doc.id Z
                })
                setTasks(taskData)
            })
            return () => unsubscribe()  
        }
        getUserTasks()
    }, [auth?.currentUser?.uid]);


    return (
        <>
            <section className="tasks-cntr">
                <div className="tasks-inner-cntr">

                    <div className="tasks-inner-cntr__title">
                        <h2>Tasks</h2>
                        <Link to="/create-task" className="add-btn">
                            <MdAddCircle/>
                        </Link>
                    </div>

                    <div className="task-posts-cntr">
                        {tasks?.map( (task) => (
                            <TaskPost task={task} key={task.id} /> 
                        ))}
                    </div>

                </div>
            </section>
        </>
    )
};

