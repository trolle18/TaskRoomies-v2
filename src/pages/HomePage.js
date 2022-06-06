import { tasksRef } from "../firebase-config";
import { grouptaskRef } from "../firebase-config";
import { onSnapshot, query, orderBy } from "@firebase/firestore";
import GroupPostCard from "../components/GroupPostCard";
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import WelcomeCard from "../components/WelcomeCard";


export default function HomePage() {
    const [tasks, setTasks] = useState([]); 
    const [grouptasks, setGroupTasks] = useState([]);

    // Gets one list from firebase 
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

            <br></br>
            <section className="grid-container">
                <div className="group-cntr">
                    <h2 className="cntr-title">Group tasks</h2>
                    {grouptasks.map( ( grouptask ) => (
                        <GroupPostCard grouptask={grouptask} key={grouptask.id} /> //
                    ) )}
                </div>
                <br></br>

                <div className="group-cntr">
                    <h2 className="cntr-title">Shopping list</h2>
                    {tasks.map( ( task  ) => (
                    <PostCard task={task} key={task.id} /> //
                    ) )}
                </div>
            </section>

        </section>
    );
}