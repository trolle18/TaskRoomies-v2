import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onSnapshot, query, orderBy } from "@firebase/firestore";
import { tasksRef, grouptaskRef } from "../firebase-config";
import { MdAddCircle } from "react-icons/md"
import TaskPost from "../components/TaskPost";
import WelcomeCard from "../components/WelcomeCard";
// import TaskPost from "../components/TaskPost";


export default function HomePage() {
    const [tasks, setTasks] = useState([]); 
    const [grouptasks, setGroupTasks] = useState([]);

    // Gets first list from firebase 
        useEffect(() => {
            const q = query(tasksRef, orderBy("createdAt", "desc"));    // Order by: lastest post first
            const unsubscribe = onSnapshot(q, (data) => {   // Refers to quary instead of postRef, which returns filtered results - Unsub enables ability to watch components from a different page
                const tasksData = data.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };   // Gets data from firebase (...doc.data) and with id: doc.id - gets the users id
                });
                setTasks(tasksData);
            });
            return () => unsubscribe();
        }, []);


    // Gets second list from firebase
        useEffect(() => {
            const q = query(grouptaskRef, orderBy("createdAt", "desc"));    // Order by: lastest post first
            const unsubscribe = onSnapshot(q, (data) => {    // Refers to quary instead of postRef, which returns filtered results - Unsub enables ability to watch components from a different page
                    const grouptaskData = data.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };   // Gets data from firebase (...doc.data) and with id: doc.id - gets the users id
                });
                setGroupTasks(grouptaskData);
            });
            return () => unsubscribe();
        }, []);


    return (
        <section className="page">
            <section className="card">
                <WelcomeCard />
            </section>
          
            <section className="grid-cntr">

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
                                <TaskPost task={task} key={task.id} />
                            ) )}                           
                        </article>
                    </div>                    
                </div>
               
                <div className="tasks-cntr">
                    <div className="tasks-inner-cntr">
                        <div className="tasks-inner-cntr__title">
                            <h2>Tasks</h2>
                            <Link to="/create-task" className="add-btn">
                                <MdAddCircle/>
                            </Link>
                        </div>
                        <article className="task-posts-cntr">
                            {tasks.map(( task  ) => (
                                <TaskPost task={task} key={task.id} /> 
                            ) )}
                        </article>
                    </div>
                </div>

            </section>

        </section>
    )
};
