import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import GroupCreatePage from "./pages/GroupCreatePage";
import ProfilePage from "./pages/ProfilePage";
import GroupUpdatePage from "./pages/GroupUpdatePage";
import Nav from "./components/Nav";
import Header from "./components/Header";
import DarkMode from "./components/DarkMode";


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

    
    return (
        <>
         <div className="App">
            <Header/>
            <DarkMode/>
            {isAuth ? (
                <>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="*" element={<Navigate to="/"/>} />
                        <Route path="/signin" element={<SignInPage/>} />
                        <Route path="/signup" element={<SignUpPage/>} />
                        <Route path="/profile" element={<ProfilePage/>} />
                        <Route path="/groupcreate" element={<GroupCreatePage/>} />
                        <Route path="/groupupdate/:id" element={<GroupUpdatePage/>} />
                        <Route path="/create" element={<CreatePage/>} />
                        <Route path="/update/:id" element={<UpdatePage/>} />
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
    );
}

export default App;