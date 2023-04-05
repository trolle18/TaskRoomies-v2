import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { onSnapshot, query, orderBy, addDoc, serverTimestamp } from "@firebase/firestore"; 
import { grouptaskRef } from "../firebase-config";
import { AiOutlineArrowLeft, AiOutlineCarryOut } from "react-icons/ai";
import GroupTaskForm from "../components/GroupTaskForm";
import TaskPost from "../components/TaskPost";


export default function CreateGroupTaskPage({grouptasks}) {
    const navigate = useNavigate();
    const auth = getAuth();

    async function handleSubmit(newGroupTask) {
        newGroupTask.createdAt = serverTimestamp() // Timestamp (now)
        newGroupTask.uid = auth.currentUser.uid // User-id of auth user / signed in user
        await addDoc(grouptaskRef, newGroupTask) // Adds new item
        navigate("/")
    }

    return (
        <section className="page">
            
            <section className="card">
                <Link to="/">
                    <AiOutlineArrowLeft size={30} /> <br></br>
                </Link>
                <div className="page-title">
                    <AiOutlineCarryOut/>
                    <h2>Create new group-task</h2>
                </div>
                <section className="form-cntr">
                    <GroupTaskForm saveGroupTask={handleSubmit} />
                </section>
            </section>
            
            <section className="grid-cntr">
                <div className="task-cntr">  
                    <div className="title-box">
                        <h2 className="cntr-title">Group Tasks</h2>  
                    </div>              
                    <article>
                        {grouptasks.map(( task ) => (
                            <div className="task-post" key={task.id}>
                                <TaskPost task={task} key={task.id} /> 
                            </div>
                        ) )}
                    </article>
                </div>
            </section>

        </section>
    )
};
