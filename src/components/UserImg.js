import { useState, useEffect } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { usersRef } from "../firebase-config";
import placerholder from "../assets/profile-placeholder.jpg";
import { getAuth } from "firebase/auth";


export default function User({ uid }) {
    const auth = getAuth();


    const [user, setUser] = useState({
        image: placerholder
    });

    
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