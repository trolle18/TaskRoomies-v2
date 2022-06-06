import TodoForm from "../components/TodoForm";
import { tasksRef } from "../firebase-config";
import { onSnapshot, query, orderBy } from "@firebase/firestore";
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { getAuth } from "firebase/auth";
import { addDoc, serverTimestamp } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";


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
                
                <TodoForm saveTask={handleSubmit} />
            </section>

            <section className="createtask-cntr">
                {tasks.map( (task) => (
                    <PostCard task={task} key={task.id} /> 
                ) )}
            </section>

        </section>
    );
}