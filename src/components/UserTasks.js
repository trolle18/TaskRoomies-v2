import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { getAuth, signOut, deleteUser, EmailAuthProvider } from "firebase/auth";
import { doc, getDoc, onSnapshot, query, setDoc, collection, where, getDocs, orderBy, collectionGroup } from "@firebase/firestore";
import { db, usersRef } from "../firebase-config";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md"
import TaskPost from "../components/TaskPost";
import 'firebase/database';


export default function UserTasks({ currentUser }) {
    const [tasks, setTasks] = useState([]); 
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [image, setImage] = useState("");
    const [user, setUser] = useState("");
    // const [errorMessage, setErrorMessage] = useState("");
    const auth = getAuth();


    // // Get current user data 
    // useEffect(() => {
    //     async function getUser() {
    //     if (auth.currentUser) {
    //         setEmail(auth.currentUser.email)
    //         const docRef = doc(usersRef, auth.currentUser.uid)
    //         const userData = (await getDoc(docRef)).data()  
    //         const docSnap = await getDoc(docRef)

    //         if (userData) {
    //         setUser((prevUser) => ({ ...prevUser, ...docSnap.data() }))
    //         setName(userData.name)
    //         setImage(userData.image || 'placeholder')

    //         setTasks(userData.userTasks)
    //         }
    //     }}
    //     getUser();
    // }, [auth.currentUser]);

    // ----------------------------------------------------


    // // Get user tasks from firebase 
    // useEffect(() => {
    //     async function getUserTasks() {
    //         if (auth.currentUser) {
    //             const docRef = doc(usersRef, auth.currentUser.uid)
    //             const userData = (await getDoc(docRef)).data()                  
    //             if (userData) {
    //                 const q = query(userData.userTasks)
    //                 const unsubscribe = onSnapshot(q, (data) => {   
    //                     const userTasksData = data.docs.map((doc) => { return { ...doc.data(), id: doc.id } })
    //                     setTasks(userTasksData)
    //                 })
    //                 return () => unsubscribe()
    //             }
    //     }} getUserTasks()
    // }, [auth.currentUser]);

    // ---------------------------------------------------

    // const q = query(collection(db, "userTasks"), orderBy("createdAt", "desc") );
    //     useEffect(() => {
    //         async function getUserTasks() {
    //             const querySnapshot = await getDocs(q);
    //             querySnapshot.forEach((doc) => {
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(doc.id, " => ", doc.data());
    //             })
    //         } getUserTasks()
    //     }, [])
    //     console.log(query(collection(db, "userTasks")))

    // -----------------------------------------------------



    // // Get current user data 
    // useEffect(() => {
    //     async function getUserTasks() {
    //         const docRef = doc(usersRef, auth.currentUser.uid)
    //         const userData = (await getDoc(docRef)).data()  
    //         // const docSnap = await getDoc(docRef)

    //         const userTasks = collectionGroup(db, 'userTasks')
    //         const querySnapshot = await getDocs(userTasks);

    //         if (auth.currentUser) {           
    //             if (userData) {
    //                 // setUser((prevUser) => ( { 
    //                 //     ...prevUser,
    //                 //     ...docSnap.data() 
    //                 // }))
                    
    //                 // querySnapshot.forEach((doc) => { console.log(doc.id, ' => ', doc.data()) })
    //                 const tasks = userData.userTasks
    //                 querySnapshot.forEach((doc) => { console.log( doc.data()) })
    //                 console.log(tasks)
    //                 setTasks(tasks)
    //             }
    //         } 
    //     }
    //     getUserTasks();
    // }, [auth.currentUser]);

        // // Get current user data 
        // useEffect(() => {
        //     async function getUserTasks() {
        //         const tasksData = query(collectionGroup(db, 'userTasks'));
        //         const querySnapshot = await getDocs(tasksData);
        //         querySnapshot.forEach((doc) => {
        //             console.log(doc.id, ' => ', doc.data());
        //         });
        //         // setTasks(tasks)
        //     }
        //     getUserTasks()
        //     setTasks(tasks)
            
        // }, [tasks]);


        // Gets second list from firebase
        useEffect(() => {
            const q = query(collectionGroup(db, 'userTasks'));
            const unsubscribe = onSnapshot(q, (data) => {    // Refers to quary instead of postRef, which returns filtered results - Unsub enables ability to watch components from a different page
                const taskData = data.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };   // Gets data from firebase (...doc.data) and with id: doc.id - gets the users id
                });
                setTasks(taskData);
            });
            return () => unsubscribe();
        }, []);




    return (
        <section className="tasks-cntr">
            <div className="tasks-inner-cntr">

                <div className="tasks-inner-cntr__title">
                    <h2>Tasks</h2>
                    <Link to="/create-task" className="add-btn">
                        <MdAddCircle/>
                    </Link>
                </div>

                <div className="task-posts-cntr">
                    {tasks?.map( (task) => (
                        <TaskPost task={task} key={task.id} /> 
                    ))}
                </div>

            </div>
        </section>
    )
};

