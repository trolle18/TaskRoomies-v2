import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupTaskForm from "../components/GroupTaskForm";
import { grouptaskRef } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "@firebase/firestore";
import { FaRegTrashAlt } from "react-icons/fa";
import {  AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";


export default function GroupUpdatePage() {
    const navigate = useNavigate();
    const params = useParams();
    const [grouptask, setGroupTask] = useState({});
    const grouptaskId = params.id;


    useEffect(() => {
        async function getGroupTask() {
            const docRef = doc(grouptaskRef, grouptaskId);
            const docData = await getDoc(docRef);
            setGroupTask(docData.data());
        }
        getGroupTask();
    }, [grouptaskId]);


    async function handleSubmit(taskToUpdate) {
        const docRef = doc(grouptaskRef, grouptaskId);
        await updateDoc(docRef, taskToUpdate);
        navigate("/");
    } 


    async function handleDelete() {
        const confirmDelete = window.confirm(`Delete, ${grouptask.title}?`);
        if (confirmDelete) {
            const docRef = doc(grouptaskRef, grouptaskId);
            navigate("/");
            await deleteDoc(docRef);
        }
    }



    return (
        <section className="page">
            <h1>Edit task</h1>
            <Link to="/"><AiOutlineArrowLeft size={30} />  <br></br></Link> 
                <br></br>

            <GroupTaskForm saveGroupTask={handleSubmit} grouptask={grouptask} />
            
            <button onClick={handleDelete}>
                <FaRegTrashAlt size={20} />
            </button>
        </section>
    );
}