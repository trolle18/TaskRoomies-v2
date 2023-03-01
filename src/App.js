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
import { doc, getDoc } from "firebase/firestore";
import { usersRef } from "./firebase-config";
import UpdateProfilePage from "./pages/UpdateProfilePage";


function App() {
    const auth = getAuth();
    const [isAuth, setIsAuth] = React.useState(localStorage.getItem("isAuth"));
    const [user, setUser] = useState("");



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
        async function getUser() {
            if (auth.currentUser) {
                setUser(auth.currentUser)
                const docRef = doc(usersRef, auth.currentUser.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.data()) {
                    setUser((prevUser) => ({ ...prevUser, ...docSnap.data() }))
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
                        <Route path="/" element={<HomePage user={user} />} />
                        <Route path="*" element={<Navigate to="/"/>} />
                        {/* <Route path="/signin" element={<SignInPage/>} />
                        <Route path="/signup" element={<SignUpPage/>} /> */}
                        <Route path="/profile/" element={<ProfilePage user={user} />} />
                        <Route path="/profile/update" element={<UpdateProfilePage user={user} />} />
                        <Route path="/create-grouptask" element={<CreateGroupTaskPage user={user} />} />
                        <Route path="/update-grouptask/:id" element={<UpdateGroupTaskPage user={user} />} />
                        <Route path="/create-task" element={<CreateTaskPage user={user} />} />
                        <Route path="/update-task/:id" element={<UpdateTaskPage user={user} />} />
                    </Routes>
                </>
            ) : (
                <Routes>
                    <Route path="/" element={<Navigate to="signin"/>} />
                    <Route path="*" element={<Navigate to="/"/>} />
                    <Route path="signin" element={<SignInPage/>} />
                    <Route path="signup" element={<SignUpPage/>} />
                </Routes>
            )}
         </div>
        </>
    )
};

export default App;
