//Louise
import GroupTaskForm from "../components/GroupTaskForm";
import { grouptaskRef } from "../firebase-config";
import { onSnapshot, query, orderBy } from "@firebase/firestore"; //realtime updates. Snakker sammen med en constant -
import { useState, useEffect } from "react";
import GroupPostCard from "../components/GroupPostCard";
import { getAuth } from "firebase/auth";
import { addDoc, serverTimestamp } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineCarryOut } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function CreatePage() {
    const [grouptask, setGroupTask] = useState([]); 
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const q = query(grouptaskRef, orderBy("createdAt", "desc")); // order by: lastest post first
        const unsubscribe = onSnapshot(q, (data) => {
       
            const grouptaskData = data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }; 
            });
            setGroupTask(grouptaskData);
        });
        return () => unsubscribe();
    }, []);

    async function handleSubmit(newGroupTask) {
        newGroupTask.createdAt = serverTimestamp(); // timestamp (now)
        newGroupTask.uid = auth.currentUser.uid; // user-id of auth user / signed in user
        await addDoc(grouptaskRef, newGroupTask); // adds new item
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
                <GroupTaskForm saveGroupTask={handleSubmit} />
            </section>
            
            <section className="createtask-cntr">
                {grouptask.map( ( grouptask ) => (
                    <GroupPostCard grouptask={grouptask} key={grouptask.id} /> //
                ) )}
            </section>

        </section>
    );
}