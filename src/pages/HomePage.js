import { useState, useEffect } from "react";
import { onSnapshot, query, orderBy, collection } from "@firebase/firestore";
import { grouptaskRef, db } from "../firebase-config";
import WelcomeCard from "../components/WelcomeCard";
import { getAuth } from "firebase/auth";
import TasksCntr from "../components/TasksCntr";


export default function HomePage({ user }) {
  const auth = getAuth();
  const [grouptasks, setGroupTasks] = useState([]);
  const [tasks, setTasks] = useState([]);


  // Gets group-task-list from firebase
  useEffect(() => {
    const q = query(grouptaskRef, orderBy("createdAt", "desc"))    // Order by: lastest post first
    const unsubscribe = onSnapshot(q, (data) => {    // Refers to quary instead of postRef, which returns filtered results - Unsub enables ability to watch components from a different page
      const grouptaskData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }   // Gets data from firebase (...doc.data) and with id: doc.id - gets the users id
      })
      setGroupTasks(grouptaskData)
    })
    return () => unsubscribe()
  }, []);


  // Gets user-task-list from firebase
  useEffect(() => {
    async function getUserTasks() {
      const uid = await(auth?.currentUser?.uid)
      const tasksInUserRef = collection(db, `users/${uid}/userTasks`) // ref to nested collection in the user:
      const q = query(tasksInUserRef, orderBy("createdAt")) // order / limit etc them
      const unsubscribe = onSnapshot(q, (data) => {    // Refers to query instead of db-Ref, which returns filtered results - Unsub enables ability to watch components from a different page
        const taskData = data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id, uid: doc.uid }  // Gets data from firebase (...doc.data) and with id: doc.id Z
        })
        setTasks(taskData)
      })
      return () => unsubscribe()
    }
    getUserTasks()
  }, [auth?.currentUser?.uid]);


  return (
    <section className="page">
        <section className="card">
          <WelcomeCard user={user} />
        </section>

        <section className="grid-cntr">
          {/* USER-TASKS */}
          <TasksCntr
          tasks={tasks}
          taskType="user"
          headline={"My tasks"}
          createUrl={"/create-task"}
          updateUrl={"/update-task/"}
          />
          
          {/* GROUP-TASKS */}
          <TasksCntr
          tasks={grouptasks}
          taskType="group"
          headline={"Group Tasks"}
          createUrl={"/create-grouptask"}
          updateUrl={"/update-grouptask/"}
          />
        </section>

    </section>
  )
};
