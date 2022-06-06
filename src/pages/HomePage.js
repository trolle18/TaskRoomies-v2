import { tasksRef } from "../firebase-config";
import { grouptaskRef } from "../firebase-config";
import { onSnapshot, query, orderBy } from "@firebase/firestore"; //realtime updates. Snakker sammen med en constant -
import GroupPostCard from "../components/GroupPostCard";
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import WelcomeCard from "../components/WelcomeCard";

export default function HomePage() {
    const [tasks, setTasks] = useState([]); //gemmer alt data i et state

    useEffect(() => {
        const q = query(tasksRef, orderBy("createdAt", "desc")); // order by: lastest post first
        const unsubscribe = onSnapshot(q, (data) => {
        //referer til quary i stedet for postsRef, fordi så kommer den med filterede resultater. unsub gør at man kan kigge på komponenterne, selvom man ikke er på samme side.
        const tasksData = data.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }; //henter alt data fra firebase (...doc.data) og sammen med id: doc.id - skriver id'et fra brugeren.
        });
        setTasks(tasksData);
        });
        return () => unsubscribe();
    }, []);

    const [grouptasks, setGroupTasks] = useState([]); //gemmer alt data i et state
    useEffect(() => {
        const q = query(grouptaskRef, orderBy("createdAt", "desc")); // order by: lastest post first
        const unsubscribe = onSnapshot(q, (data) => {
        //referer til quary i stedet for postsRef, fordi så kommer den med filterede resultater. unsub gør at man kan kigge på komponenterne, selvom man ikke er på samme side.
        const grouptaskData = data.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }; //henter alt data fra firebase (...doc.data) og sammen med id: doc.id - skriver id'et fra brugeren.
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