import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onSnapshot, query, orderBy, getDoc, doc, collection, getDocs } from "@firebase/firestore";
import { tasksRef, grouptaskRef, usersRef, db } from "../firebase-config";
import { MdAddCircle } from "react-icons/md"
import TaskPost from "../components/TaskPost";
import WelcomeCard from "../components/WelcomeCard";
import { getAuth } from "firebase/auth";
import UserTasks from "../components/UserTasks";


export default function HomePage( {user} ) {
    const auth = getAuth();
    const [grouptasks, setGroupTasks] = useState([]);
    const [tasks, setTasks] = useState([]); 
    // const [userTasks, setUserTasks] = useState([]); 
    
    
    // Gets group-task-list from firebase
    useEffect(() => {
        const q = query(grouptaskRef, orderBy("createdAt", "desc"));    // Order by: lastest post first
        const unsubscribe = onSnapshot(q, (data) => {    // Refers to quary instead of postRef, which returns filtered results - Unsub enables ability to watch components from a different page
                const grouptaskData = data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };   // Gets data from firebase (...doc.data) and with id: doc.id - gets the users id
            });
            setGroupTasks(grouptaskData);
        });
        return () => unsubscribe();
    }, [])


    // Gets user-task-list from firebase 
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
        <section className="page">

            <section className="card">
                <WelcomeCard user={user} />
            </section>
          
            <section className="grid-cntr">
                {/* <UserTasks/> */}

                <div className="tasks-cntr">
                    <div className="tasks-inner-cntr">
                        <div className="tasks-inner-cntr__title">
                            <h2>Tasks</h2>  
                            <Link to="/create-task" className="add-btn">
                                <MdAddCircle/>
                            </Link>
                        </div>
                        <article className="task-posts-cntr">
                            {tasks.map(( task ) => (
                                <TaskPost 
                                // saveTask={handleSave(task)} 
                                task={task} key={task.id} />
                            ) )}                           
                        </article>
                    </div>                    
                </div>

                <div className="tasks-cntr">
                    <div className="tasks-inner-cntr">
                        <div className="tasks-inner-cntr__title">
                            <h2>Group tasks</h2>  
                            <Link to="/create-grouptask" className="add-btn">
                                <MdAddCircle/>
                            </Link>
                        </div>
                        <article className="task-posts-cntr">
                            {grouptasks.map(( task ) => (
                                <TaskPost 
                                // saveTask={handleSave(task)} 
                                task={task} key={task.id} />
                            ) )}                           
                        </article>
                    </div>                    
                </div>

              
            </section>
        </section>
    )
};
