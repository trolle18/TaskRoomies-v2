import React, { useState } from "react";
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



function App() {
    const auth = getAuth();
    const [isAuth, setIsAuth] = React.useState(localStorage.getItem("isAuth"));

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsAuth(true);
            localStorage.setItem("isAuth", true);
        } else {
            setIsAuth(false);
            localStorage.removeItem("isAuth");
        }
    });


    var [theme, setTheme] = useState( localStorage.getItem('theme') || 'light');
    var button = document.getElementById("darkModeBtn")

    const toggleTheme = () => {        
        if (theme !== 'dark') { setTheme('dark') }
        if (theme !== 'light') { setTheme('light') }
        button.classList.add(theme)
        localStorage.setItem('theme', theme);
    }

    
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
                    <Nav />
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="*" element={<Navigate to="/"/>} />
                        <Route path="/signin" element={<SignInPage/>} />
                        <Route path="/signup" element={<SignUpPage/>} />
                        <Route path="/profile" element={<ProfilePage/>} />
                        <Route path="/create-grouptask" element={<CreateGroupTaskPage/>} />
                        <Route path="/update-grouptask/:id" element={<UpdateGroupTaskPage/>} />
                        <Route path="/create-task" element={<CreateTaskPage/>} />
                        <Route path="/update-task/:id" element={<UpdateTaskPage/>} />
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
