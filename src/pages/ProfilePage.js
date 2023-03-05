import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, deleteUser, EmailAuthProvider } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import 'firebase/database';
import { BiPencil } from "react-icons/bi"
import placerholder from "../assets/profile-placeholder.jpg";
import { usersRef } from "../firebase-config";


export default function ProfilePage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");


  useEffect(() => {
    async function getUser() {
      if (auth.currentUser) {
        setUser(auth.currentUser)
        const docRef = doc(usersRef, auth.currentUser.uid)
        const userData = (await getDoc(docRef)).data()
        const docSnap = await getDoc(docRef)
        if (docSnap.data()) {
          setUser((prevUser) => ({ ...prevUser, ...docSnap.data() }))
          setName(userData.name)
          setImage(userData.image || 'placeholder')
        }
      }
    }
    getUser()
  }, [auth.currentUser]);



  // Navigate to profile-update page
  function handleClick() {
    navigate(`/profile-update`)
  };


  // Sign out
  function handleSignOut() {
    signOut(auth)
  };


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
      error("An error occurred, please try again later")
    })
  };


  function getCreatedAtDate(user) {
    const date = user.createdAt
    const setDate = new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' } )
    if(date) { return (
      // setDate
      <div className="flex-rows user-details">
      <span className="bold">User created:</span> 
      <span>{setDate}</span>
    </div>
      ) }
  };


  return (
    <section className="page">

      <div className="page__header-cntr">
        <h3>Profile</h3>
      </div>     

      <div className="flex-outer-wrapper">

        <div className="profile-avatar">
          <div className="user-img">
            <img src={user.image} alt={user.name} onError={(event) => (event.target.src = placerholder)} />
          </div>
        </div>

        <div className="flex-inner-wrapper">
          <div className="flex-rows space-between">

            <div className="flex-cols">
              <div className="flex-rows user-details">
                <span className="bold">Name:</span>
                <span>{user.name}</span>
              </div>
              <div className="flex-rows user-details">
                <span className="bold">Email:</span>
                <span>{user.email}</span>
              </div>
              {getCreatedAtDate(user)}
            </div>

            <div className="edit-btn">
              <button onClick={handleClick} label="Edit user">
                <BiPencil />
              </button>
            </div>
          </div>

        </div> 
      </div>  

      <div className="flex-cols profile-btn-cntr">
        <button className="btn" onClick={handleSignOut} label="Sign out">
          Sign out
        </button>
        <button className="btn-outline" onClick={handleUserDelete} label="Delete user" data-id={auth.currentUser.uid}>
          Delete user
        </button>
      </div>

    </section>
  )
};

