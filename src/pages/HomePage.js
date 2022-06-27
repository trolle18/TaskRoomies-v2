import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onSnapshot, query, orderBy } from "@firebase/firestore";
import { tasksRef, grouptaskRef } from "../firebase-config";
import { MdAddCircle } from "react-icons/md"
import GroupPostCard from "../components/task-posts/GroupPostCard";
import PostCard from "../components/task-posts/PostCard";
import WelcomeCard from "../components/welcome-card/WelcomeCard";


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
                <div className="task-cntr">
                    <div className="title-box">
                        <h2>Group tasks</h2>  
                        <Link to="/groupcreate" className="task-cntr-link">
                            <MdAddCircle/>
                        </Link>
                    </div>
                    <article>
                        {grouptasks.map( ( grouptask ) => (
                            <div key={grouptask.id}>
                                <div className="vertical-seb"></div>
                                <div className="task-post">
                                    <GroupPostCard grouptask={grouptask} key={grouptask.id} />
                                </div>
                            </div>
                        ) )}
                           
                    </article>
                </div>
               
                <div className="task-cntr">
                    <div className="title-box">
                        <h2 className="cntr-title">Shopping list</h2>
                        <Link to="/create" className="task-cntr-link">
                            <MdAddCircle/>
                        </Link>
                    </div>
                    <article>
                        {tasks.map( ( task  ) => (
                            <div key={task.id}>
                                <div className="vertical-seb"></div>
                                <div className="task-post">
                                    <PostCard task={task} key={task.id} /> 
                                </div>
                            </div>
                        ) )}
                    </article>
                </div>
            </section>

        </section>
    );
}