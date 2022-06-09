import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { usersRef } from "../firebase-config";


export default function UserName({ currentUser }) {
    const [user, setUser] = useState({
        name: "Name",
    });


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
}