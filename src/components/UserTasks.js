import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { getAuth, signOut, deleteUser, EmailAuthProvider } from "firebase/auth";
import { doc, getDoc, onSnapshot, query, setDoc, collection, where, getDocs, orderBy, collectionGroup, Firestore, getFirestore } from "@firebase/firestore";
import { db, usersRef } from "../firebase-config";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md"
import TaskPost from "../components/TaskPost";
import 'firebase/database';

// export async function getPostsCollectionNestedInUserByUid(uid) {
//     // ref to nested collection in the user:
//     const tasksInUserRef = collection(Firestore, `users/${uid}/userTasks`)

//     // order / limit etc them:
//     const q = query(tasksInUserRef, orderBy("createdAt"))

//     // async get data:
//     const tasksInUserSnapshot = await getDocs(q);
//     const arr = []
//     tasksInUserSnapshot.docs.map((d) => {
//         return arr.push(d.data())
//     })
    
//     console.log(arr)
//     return arr    
// }

export default function UserTasks({ currentUser }) {
    const [tasks, setTasks] = useState([]); 
    const [userTasks, setUserTasks] = useState([]); 
    const auth = getAuth();

    
    // Get task list from firebase
    useEffect(() => {
        async function getTasks() {
            const userId = await(auth?.currentUser?.uid)
            const q = query(collectionGroup(db, 'userTasks'))
            const unsubscribe = onSnapshot(q, (data) => {    // Refers to quary instead of postRef, which returns filtered results - Unsub enables ability to watch components from a different page
                const taskData = data.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id, uid: doc.uid }  // Gets data from firebase (...doc.data) and with id: doc.id - gets the users id
                })
                // console.log(taskData)
                setTasks(taskData)
            })
            return () => unsubscribe()
        }
        getTasks()
    }, []);



    useEffect(() => {
            async function getUserTasks() {
            const uid = await(auth?.currentUser?.uid)
            const tasksInUserRef = collection(db, `users/${uid}/userTasks`) // ref to nested collection in the user:
            const q = query(tasksInUserRef, orderBy("createdAt")) // order / limit etc them
        
            // async get data:
            const tasksInUserSnapshot = await getDocs(q);
            const arr = []
            const taskData = tasksInUserSnapshot.docs.map((d) => {
                return arr.push(d.data())
            })
            setUserTasks(taskData)
            return arr    
        }
        getUserTasks()
    }, []);
    // console.log(userTasks)




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

