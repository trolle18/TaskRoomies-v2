import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, deleteUser, EmailAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { usersRef } from "../firebase-config";
import 'firebase/database';
import { BiPencil } from "react-icons/bi"
import placerholder from "../assets/profile-placeholder.jpg";


export default function ProfilePage({ user }) {
    const auth = getAuth();
    const navigate = useNavigate();



    // Sign out
    function handleSignOut() {
        signOut(auth)
    }


    function handleClick() {
        navigate(`/profile-update`);
    }


    // Delete user handler
    function handleUserDelete() {
        const auth = getAuth()
        const user = auth.currentUser.uid
        const credentials = EmailAuthProvider.credential( user.email, "yourpassword" ) // If session expired, reauthenticate user credentials
        user.reauthenticateWithCredential(credentials);
        deleteUser(user)
        .then(() => {
            const confirmDelete = window.confirm(`Are you sure, you want to delete your profile ${user.name}?`)
            if (confirmDelete) {                    
                const docRef = doc(user)
                deleteUser(docRef)
                navigate("/signup")                
            }
        })
        .catch((error) => {
            error("An error occurred, try again later")
        })
    }

    

    return (
        <section className="page">
            <div className="profile-page">
                <h3>Profile</h3>
                <div className="edit-btn">
                    <button onClick={handleClick}>
                        <BiPencil />
                    </button>
                </div>
                  
                <div className="profile-avatar">
                    <div className="user-img">
                        <img src={user.image} alt={user.name} onError={(event) => (event.target.src = placerholder)} />
                    </div>
                </div>
                
                <div>
                    <div>
                        <span>Name: </span>
                        <span>{user.name}</span>
                    </div>

                    <div>
                        <span>Email: </span>
                        <span>{user.email}</span>
                    </div>
                </div>


                <div className="profile-btn-cntr">
                    <button className="btn" onClick={handleSignOut}>
                        Sign out
                    </button>
                    <button className="btn-outline" onClick={handleUserDelete} data-id={auth.currentUser.uid} >
                        Delete user
                    </button>
                </div>

            </div>           
        </section>
    )
}
