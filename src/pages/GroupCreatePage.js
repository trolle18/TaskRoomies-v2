import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { onSnapshot, query, orderBy, addDoc, serverTimestamp } from "@firebase/firestore"; 
import { grouptaskRef } from "../firebase-config";
import { AiOutlineArrowLeft, AiOutlineCarryOut } from "react-icons/ai";
import GroupTaskForm from "../components/task-forms/GroupTaskForm";
import GroupPostCard from "../components/task-posts/GroupPostCard";


export default function CreatePage() {
    const [grouptask, setGroupTask] = useState([]); 
    const navigate = useNavigate();
    const auth = getAuth();


    // Gets grouptasks from firebase, to display under the form
    useEffect(() => {
        const q = query(grouptaskRef, orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (data) => {
            const grouptaskData = data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }; 
            });
            setGroupTask(grouptaskData);
        });
        return () => unsubscribe();
    }, []);


    // Create and submit new task
    async function handleSubmit(newGroupTask) {
        newGroupTask.createdAt = serverTimestamp(); // Timestamp (now)
        newGroupTask.uid = auth.currentUser.uid; // User-id of auth user / signed in user
        await addDoc(grouptaskRef, newGroupTask); // Adds new item
        navigate("/");
    }



    return (
        <section className="page">
            
            <section className="card">
                <Link to="/">
                    <AiOutlineArrowLeft size={30} /> <br></br>
                </Link>
                <div className="page-title">
                    <AiOutlineCarryOut/>
                    <h2>Create new task</h2>
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
                        {grouptask.map( ( grouptask ) => (
                            <>
                                <div className="vertical-seb"></div>
                                <div className="task-post">
                                    <GroupPostCard grouptask={grouptask} key={grouptask.id} /> 
                                </div>
                            </>
                        ) )}
                    </article>
                </div>
            </section>


        </section>
    );
}