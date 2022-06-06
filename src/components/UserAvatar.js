import { useState, useEffect } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { usersRef } from "../firebase-config";
import { getAuth } from "firebase/auth";
import placerholder from "../assets/profile-placeholder.jpg";


export default function UserAvatar({ currentUser }) {
    const [user, setUser] = useState({
        image: placerholder,
        name: "Users Name",
    });
    const auth = getAuth();

    useEffect(() => {
        async function getUser() {
            const docRef = doc(usersRef, auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.data()) {
                setUser((prevUser) => ({ ...prevUser, ...docSnap.data() }));
            }
        }
        getUser();
    }, [auth.currentUser]);

    // console.log(currentUser)



    return (
        <div className="avatar">
            <img src={user.image} alt={user.id} />
            <span>
                <h3>{user.name}</h3>
            </span>
        </div>
    );
}