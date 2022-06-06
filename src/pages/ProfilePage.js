import { useState, useEffect } from "react";
import { usersRef } from "../firebase-config";
import { getAuth, signOut, deleteUser, EmailAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import 'firebase/database';
import { useNavigate } from "react-router-dom";
import placerholder from "../assets/profile-placeholder.jpg";
import { HiMinusCircle } from "react-icons/hi";
import { FaBell } from "react-icons/fa";


export default function ProfilePage({ currentUser }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [user, setUser] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const auth = getAuth();
    const navigate = useNavigate();
    

    useEffect(() => {
        async function getUser() {
        if (auth.currentUser) {
            setEmail(auth.currentUser.email);
            const docRef = doc(usersRef, auth.currentUser.uid);
            const userData = (await getDoc(docRef)).data();        
            const docSnap = await getDoc(docRef);
            if (userData) {
            setUser((prevUser) => ({ ...prevUser, ...docSnap.data() }));
            setName(userData.name);
            setImage(userData.image || 'placeholder');
            }
        }}
        getUser();
    }, [auth.currentUser]);


    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file.size < 500000) {
        // image file size must be below 0,5MB
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target.result);
        };
        reader.readAsDataURL(file);
        setErrorMessage(""); // reset errorMessage state
        } else {
        // if not below 0.5MB display an error message using the errorMessage state
        setErrorMessage("The image file is too big!");
        }
    }


    async function submitEvent(event) {
        event.preventDefault();

        const userToUpdate = { name: name, image: image };
        console.log(userToUpdate)
        const docRef = doc(usersRef, auth.currentUser.uid);
        
        await setDoc(docRef, userToUpdate);
        navigate("/");
        console.log(userToUpdate);
    }


    // Sign out
    function handleSignOut() {
        signOut(auth);
    }


    // Delete user handler
    function handleUserDelete() {
        const auth = getAuth();
        const user = auth.currentUser.uid;

        // If session expired, reauthenticate user credentials
        const credentials = EmailAuthProvider.credential(
            user.email,
            "yourpassword"
        );
        user.reauthenticateWithCredential(credentials);

        deleteUser(user)
        .then(() => {})
        .catch((error) => {
            // ...
        });
    }
    


    return (
        <section className="page">
            <div className="profile-page">

                <form onSubmit={submitEvent}>
                    <h3>Profile</h3>
                    <div className="profile-avatar">
                        <div className="user-img">
                            <img src={image} alt={image} onError={(event) => (event.target.src = placerholder)} />
                        </div>
                        <p className="text-error">{errorMessage}</p>
                        {/* <label for="useravatar" className="profile-avatar-label"> Profile picture </label> */}
                        <span>Profile picture</span>
                        <input type="file" accept="image/*" value="" onChange={handleImageChange}  name="image" placeholder="pic" />
                    </div>

                    <span>Name</span>
                    <input  type="text" value={name} onChange={e => setName(e.target.value)} name="name" placeholder="name"  />
                    
                    <span>Email</span>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}  name="email" placeholder="user@mail.com"  />

                    <label className="notif-box">
                        <div> <FaBell /> <p>Notifications</p>{" "}</div>
                        <input className="notif_label" type="checkbox" name="bellcheckbox" />
                    </label>

                    <button className="btn">Save</button>

                    <div className="profile-btn-cntr">
                        <button className="btn" onClick={handleSignOut} /*data-id={user.id}*/>
                            Sign out
                        </button>
                        <button className="btn-outline" onClick={handleUserDelete} data-id={auth.currentUser.uid} >
                            Delete user
                        </button>
                    </div>

                </form>
            </div>

            <div className="profile-page">
                <form>
                    <h3>Group</h3>

                    <div className="group-members-box">
                        <div className="user-img">
                            <img src={image} alt=""/>
                        </div>
                        <div className="group-members-details">
                            <input  type="text" className="group-member"  value={name} name="name" placeholder={`${name}`}/>
                            <input type="email"  className="group-member" value={email} name="email" placeholder={`${email}`} />
                        </div>
                        <button  className="remove-btn"> <HiMinusCircle /> </button>
                    </div>

                    <div className="group-members-box">
                        <div className="user-img">
                            <img src={image} alt="" />
                        </div>
                        <div className="group-members-details">
                            <input type="text" className="group-member" value={name} name="name" placeholder="groupmember"  />
                            <input type="email" className="group-member" value={email} name="email" placeholder="member@email.dk" />
                        </div>
                        <button className="remove-btn"> {" "}<HiMinusCircle />{" "}</button>
                    </div>

                    {/* <button className="invite-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                        <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z" />
                        </svg>
                        invite
                    </button> */}

                </form>
            </div>
        </section>
    );
}