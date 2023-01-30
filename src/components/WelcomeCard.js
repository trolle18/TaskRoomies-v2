import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { usersRef } from "../firebase-config";
import placerholder from "../assets/profile-placeholder.jpg";


// User Name
export function UserName({ currentUser }) {
    const [user, setUser] = useState({ name: "Name", });

    const auth = getAuth();
    useEffect(() => {
        async function getUser() {
            if (auth.currentUser) {
                setUser(auth.currentUser);
                const docRef = doc(usersRef, auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.data()) {
                    setUser((prevUser) => ({ ...prevUser, ...docSnap.data() }));
                }
            }
        }
        getUser();
    }, [auth.currentUser]);

    return (
        <>
            <span className="user-name">{user.name}</span>
        </>
    );
};


// User Image 
function UserImg({ uid }) {
    const auth = getAuth();
    const [user, setUser] = useState({ image: placerholder });

    useEffect(() => {
        async function getUser() {
            if (auth.currentUser) {
                setUser(auth.currentUser);
                const docRef = doc(usersRef, auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.data()) {
                    setUser((prevUser) => ({ ...prevUser, ...docSnap.data() }));
                }
            }
        }
        getUser();
    }, [auth.currentUser]);

    return (
        <div className="user-img">
            <img src={user.image} alt={user.id} />
        </div>
    );
}


export default function WelcomeCard() {
    const today = new Date().toLocaleDateString()

    return (
        <div className="welcome-card">
            <div className="userimg-cntr">
                <UserImg /> 
            </div>
            <div className="msg-cntr">
                <div className="msg-cntr__left">
                    <h2>Hi, <UserName />!</h2>
                    <p>Welcome back</p>
                </div>
                
                <p className="msg-cntr__top">
                    {today}
                </p>
            </div>
        </div>
    );
}
