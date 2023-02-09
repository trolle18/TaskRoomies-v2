import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { getAuth, signOut, deleteUser, EmailAuthProvider } from "firebase/auth";
import { doc, getDoc, onSnapshot, query, setDoc, collection, where, getDocs, orderBy, collectionGroup } from "@firebase/firestore";
import { db, usersRef } from "../firebase-config";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md"
import TaskPost from "../components/TaskPost";
import 'firebase/database';


export default function UserTasks({ currentUser }) {
    const [tasks, setTasks] = useState([]); 
    // const [user, setUser] = useState("");
    const auth = getAuth();

    
    // Get task list from firebase
    useEffect(() => {
        async function getTasks() {
            const userId = await(auth?.currentUser?.uid)
            const q = query(collectionGroup(db, 'userTasks'))
            const unsubscribe = onSnapshot(q, (data) => {    // Refers to quary instead of postRef, which returns filtered results - Unsub enables ability to watch components from a different page
                const taskData = data.docs
                // .filter((doc) => doc?.uid === userId )
                .map((doc) => {
                    return { ...doc.data(), id: doc.id, uid: doc.uid }  // Gets data from firebase (...doc.data) and with id: doc.id - gets the users id
                })
                console.log(taskData)
                setTasks(taskData)
            })
            return () => unsubscribe()
        }
        getTasks()
    }, []);


//     function GetUserId() {
//     // useEffect(() => {
//         async function getUid() {
//             const userId = await(auth?.currentUser?.uid)
//             return userId
//         }
//         getUid()
//         console.log("get uid: ", getUid())
//     // }, [])
//     }
// GetUserId()
    

    return (
        <section className="tasks-cntr">
            <div className="tasks-inner-cntr">

                <div className="tasks-inner-cntr__title">
                    <h2>Tasks</h2>
                    <Link to="/create-task" className="add-btn">
                        <MdAddCircle/>
                    </Link>
                </div>

                <div className="task-posts-cntr">
                    {tasks
                    // ?.filter( (task) => task.uid === GetUserId)
                    ?.map( (task) => (
                        <TaskPost task={task} key={task.id} /> 
                    ))}
                </div>

            </div>
        </section>
    )
};

