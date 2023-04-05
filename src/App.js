import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import CreateTaskPage from "./pages/CreateTaskPage";
import CreateGroupTaskPage from "./pages/CreateGroupTaskPage";
import UpdateGroupTaskPage from "./pages/UpdateGroupTaskPage";
import UpdateTaskPage from "./pages/UpdateTaskPage";
import ProfilePage from "./pages/ProfilePage";
import Nav from "./components/Nav";
import Header from "./components/Header";
import { WiSolarEclipse } from "react-icons/wi";
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, usersRef } from "./firebase-config";
import UpdateProfilePage from "./pages/UpdateProfilePage";


function App() {
    const auth = getAuth();
    const [isAuth, setIsAuth] = React.useState(localStorage.getItem("isAuth"));
    const [user, setUser] = useState("");
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");



    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsAuth(true)
            localStorage.setItem("isAuth", true)
        } else {
            setIsAuth(false)
            localStorage.removeItem("isAuth")
        }
    })


    var [theme, setTheme] = useState( localStorage.getItem('theme') || 'light')
    var button = document.getElementById("darkModeBtn")
    const toggleTheme = () => {        
        if (theme !== 'dark') { setTheme('dark') }
        if (theme !== 'light') { setTheme('light') }
        button.classList.add(theme)
        localStorage.setItem('theme', theme)
    }

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



    useEffect(() => {
        async function getUser() {
            if (auth.currentUser) {
                setUser(auth.currentUser)
                const docRef = doc(usersRef, auth.currentUser.uid)
                const userData = (await getDoc(docRef)).data()      
                const docSnap = await getDoc(docRef)
                if (docSnap.data()) {
                    setUser((prevUser) => ({ ...prevUser, ...docSnap.data() }))
                    setName(userData.name)
                    setImage(userData.image || 'placeholder')
                }
            }
        }
        getUser()
    }, [auth.currentUser])


    
    
    return (
        <>
         <div className="App" id="app">
            <Header/>
            <div>
                <div className="darkmode-btn-box" id="darkModeBtn">
                    <button id="DarkModeButton" onClick={toggleTheme}>
                        <WiSolarEclipse />
                    </button>
                </div>
            </div>


            {/* <DarkMode/> */}
            {isAuth ? (
                <>
                    <Nav user={user} />
                    <Routes>
                        <Route path="*" 
                            element={ <Navigate to="/"/> }
                        />

                        <Route path="/"
                            element={ <HomePage user={user} tasks={tasks} /> }
                        />

                        <Route path="/profile/" 
                            element={ <ProfilePage /> }
                        />

                        <Route path="/profile-update" 
                            element={ <UpdateProfilePage user={user} /> }
                        />

                        <Route path="/create-grouptask" 
                            element={ <CreateGroupTaskPage user={user} /> } 
                        />

                        <Route path="/update-grouptask/:id" 
                            element={ <UpdateGroupTaskPage user={user} /> }
                        />

                        <Route path="/create-task" 
                            element={ <CreateTaskPage user={user} tasks={tasks} /> } 
                        />
                        
                        <Route path="/update-task/:id" 
                            element={ <UpdateTaskPage user={user} tasks={tasks}  /> }
                        />

                    </Routes>
                </>
            ) : (
                <Routes>
                    <Route path="/" 
                        element={ <Navigate to="signin"/> } 
                    />

                    <Route path="*" 
                        element={ <Navigate to="/"/> } 
                    />

                    <Route path="signin" 
                        element={ <SignInPage/> } 
                    />

                    <Route path="signup" 
                        element={ <SignUpPage/> } 
                    />
                </Routes>
            )}
         </div>
        </>
    )
};

export default App;
