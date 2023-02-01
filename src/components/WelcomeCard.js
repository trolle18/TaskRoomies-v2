import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { usersRef } from "../firebase-config";
import Placerholder from "../assets/profile-placeholder.jpg";
import { getTodaysDate } from "../utils/GetDates";


export default function WelcomeCard() {
    const [user, setUser] = useState("");
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

    function getImg(user) {
        const img = user.image
        const placeholder = Placerholder

        if (img) return img
        else return (placeholder)
        
        // else return (placeholder)
    }

    console.log(getTodaysDate)

    return (
        <div className="welcome-card">
            <div className="userimg-cntr">
                {/* <UserImg />  */}
                <div className="user-img">
                    <img src={getImg(user)} alt={user.name} />
                </div>
            </div>
            <div className="msg-cntr">
                <div className="msg-cntr__right">
                   <p className="ucase">
                    {/* {getTodaysWeekday},  */}
                   {getTodaysDate}</p>                     
                </div>

                <div className="msg-cntr__left">
                    <p>Hi, {user.name}!</p>
                    <p>Welcome back</p>
                </div>
                
                
            </div>
        </div>
    );
}
