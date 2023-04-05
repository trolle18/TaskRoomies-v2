import { useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { addDoc, serverTimestamp, collection } from "@firebase/firestore";
import { db } from "../firebase-config";
import { AiOutlineArrowLeft } from "react-icons/ai";
import TaskPost from "../components/TaskPost";
import TaskForm from "../components/TaskForm/TaskForm";


export default function CreateTaskPage({tasks}) {
    const navigate = useNavigate();
    const auth = getAuth();

    async function saveTask(newTask) {
        newTask.createdAt = serverTimestamp(); // timestamp (now)
        newTask.uid = auth.currentUser.uid; // user-id of auth user / signed in user
        const uid = await(auth?.currentUser?.uid)
        const tasksInUserRef = collection(db, `users/${uid}/userTasks/`) 
        const docRef = tasksInUserRef 
        await addDoc(docRef, newTask)
        navigate("/")
    };


    return (
        <section className="page">
            <section className="card">
                <Link to="/">
                    <AiOutlineArrowLeft size={30} /> 
                </Link>
                <div className="page-title">
                    <h2>Create new task</h2>
                </div>
                <section className="form-cntr">

                    <TaskForm saveTask={saveTask} />
                </section>
            </section>

            <section className="grid-cntr">
                <div className="task-cntr">
                    <div className="title-box">
                        <h4 className="cntr-title">
                            Tasks
                        </h4>  
                    </div> 
                    <div className="task-posts-cntr">
                        {tasks?.map( (task) => (
                            <TaskPost task={task} key={task.id} 
                            // updateUrl={updateUrl} 
                            /> 
                        ))}
                    </div>
                </div>
            </section>
        </section>
    )
};
