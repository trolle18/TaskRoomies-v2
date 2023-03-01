import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, deleteUser, EmailAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { usersRef } from "../firebase-config";
import 'firebase/database';
import { FaBell } from "react-icons/fa";
import placerholder from "../assets/profile-placeholder.jpg";
import UpdateUserForm from "../components/UpdateUserForm";


export default function UpdateProfilePage({ currentUser }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [user, setUser] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const auth = getAuth();
    const navigate = useNavigate();

    
    // Get current user data 
    useEffect(() => {
        async function getUser() {
        if (auth.currentUser) {
            setEmail(auth.currentUser.email)
            const docRef = doc(usersRef, auth.currentUser.uid)
            const userData = (await getDoc(docRef)).data()      
            const docSnap = await getDoc(docRef)
            if (userData) {
                setUser((prevUser) => ({ ...prevUser, ...docSnap.data() }))
                setName(userData.name)
                setImage(userData.image || 'placeholder')
            }
        }}
        getUser()
    }, [auth.currentUser])



    // Change user image
    function handleImageChange(event) {
        const file = event.target.files[0]
        if (file.size < 500000) { // image file size must be below 0,5MB
            const reader = new FileReader()
            reader.onload = (event) => {
                setImage(event.target.result)
            }
            reader.readAsDataURL(file)
            setErrorMessage("") // reset errorMessage state
        } else { // if image >0.5MB, display an error message using the errorMessage state
            setErrorMessage("The image file is too big! The image file size must be below 0,5MB")
        }
    }


    // Submit updated user details
    async function submitEvent(event) {
        event.preventDefault()
        const userToUpdate = { name: name, image: image }
        const docRef = doc(usersRef, auth.currentUser.uid)
        await setDoc(docRef, userToUpdate)
        navigate("/")
    }


    // Sign out
    function handleSignOut() {
        signOut(auth)
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

                <UpdateUserForm/>                 

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
