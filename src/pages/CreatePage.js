import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { onSnapshot, query, orderBy, addDoc, serverTimestamp } from "@firebase/firestore";
import { tasksRef } from "../firebase-config";
import { AiOutlineArrowLeft, AiOutlineShoppingCart } from "react-icons/ai";
import TaskForm from "../components/task-forms/TaskForm";
import PostCard from "../components/task-posts/PostCard";


export default function CreatePage() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const q = query(tasksRef, orderBy("createdAt", "desc")); // order by: lastest post first
        const unsubscribe = onSnapshot(q, (data) => {

            const tasksData = data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
            setTasks(tasksData);
        });

        return () => unsubscribe();
    }, []);


    async function handleSubmit(newTask) {
        newTask.createdAt = serverTimestamp(); // timestamp (now)
        newTask.uid = auth.currentUser.uid; // user-id of auth user / signed in user
        await addDoc(tasksRef, newTask); // Posts input to homepage
        navigate("/");
    }



    return (
        <section className="page">

            <section className="card">
                <Link to="/">
                    <AiOutlineArrowLeft size={30} /> <br></br>
                </Link>
                <div className="page-title">
                    <AiOutlineShoppingCart/>
                    <h2>Add item to shopping list</h2>
                </div>
                <section className="form-cntr">
                    <TaskForm saveTask={handleSubmit} />
                </section>
            </section>

            <section className="grid-cntr">
                <div className="task-cntr">
                <div className="title-box">
                        <h2 className="cntr-title">Group Tasks</h2>  
                    </div> 
                    <article>
                        {tasks.map( ( task ) => (
                            // <>
                            //     <div className="vertical-seb"></div>
                                <div className="task-post" key={task.id}>
                                    <PostCard task={task} key={task.id} /> 
                                </div>
                            // </>
                        ) )}
                    </article>
                </div>
            </section>

        </section>
    );
}