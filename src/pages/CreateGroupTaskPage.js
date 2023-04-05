import { useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { addDoc, serverTimestamp, getDocs, query, orderBy  } from "@firebase/firestore"; 
import { grouptaskRef, usersRef } from "../firebase-config";
import { AiOutlineArrowLeft, AiOutlineCarryOut } from "react-icons/ai";
import TaskPost from "../components/TaskPost";
import TaskForm from "../components/TaskForm/TaskForm";
import Form from "../components/TaskForm/Form";
import { useEffect, useState } from "react";


export default function CreateGroupTaskPage({ grouptasks }) {
    const [group, setGroup] = useState([]);
    const navigate = useNavigate();
    const auth = getAuth();

    async function saveTask(newGroupTask) {
        newGroupTask.createdAt = serverTimestamp() // Timestamp (now)
        newGroupTask.uid = auth.currentUser.uid // User-id of auth user / signed in user
        await addDoc(grouptaskRef, newGroupTask) // Adds new item
        navigate("/")
    }

      // Get groupmembers
  useEffect(() => {
    async function getGroup() {
      const q = query(usersRef, orderBy("name"))
      const data = await getDocs(q)
      const groupData = data.docs.map(doc => {
        return { ...doc.data(), id: doc.id } // changing the data structure so it's all gathered in one object
      })
      setGroup(groupData)
    }
    getGroup()
  }, []);


    return (
        <section className="page">
            <section className="card">
                <Link to="/">
                    <AiOutlineArrowLeft size={30} /> <br></br>
                </Link>
                <div className="page-title">
                    {/* <AiOutlineCarryOut/> */}
                    <h2>Create new group-task</h2>
                </div>
                <section className="form-cntr">
                    <Form saveTask={saveTask}  group={group} taskType="grouptask" />
                </section>
            </section>

             <section className="grid-cntr">
                <div className="task-cntr">
                    <div className="title-box">
                        <h4 className="cntr-title">
                            Group tasks
                        </h4>  
                    </div> 
                    <div className="task-posts-cntr">
                        {grouptasks?.map( (task) => (
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
