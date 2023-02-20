import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { usersRef } from "./firebase-config";


export default function User() {
    const auth = getAuth();
    const [user, setUser] = useState("");


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
    // console.log(user)

    
    return ( user )
};
