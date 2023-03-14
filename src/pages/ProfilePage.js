import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, deleteUser, EmailAuthProvider } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import 'firebase/database';
import { BiPencil } from "react-icons/bi"
import placerholder from "../assets/profile-placeholder.jpg";
import { usersRef } from "../firebase-config";
import Button from "../components/Button";


export default function ProfilePage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [uid, setUid] = useState("");
  const [user, setUser] = useState("");
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
          setUid(auth.currentUser.uid)
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
    if(date) { return <span>{setDate}</span> }
  };
  function ifCreatedDate(user) {
    const date = user.createdAt
    if(date) { return <span className="bold">Created</span> }
  };


  return (
    <section className="page">

      <div className="page__header-cntr">
        <h3>Profile</h3>
      </div>

      <div className="flex-outer-wrapper card-wrapper flex-center-items">

        <div className="profile-avatar">
          <div className="user-img">
            <img
            src={user.image}
            alt={user.name}
            onError={(event) => (event.target.src = placerholder)}
            />
          </div>
        </div>

        <div className="flex-inner-wrapper max-w">
          <div className="flex-rows space-between">

            <div className="flex-rows">
              <div className="flex-cols user-details">
                <span className="bold">Name</span>
                <span className="bold">Email</span>
                {ifCreatedDate(user)}
              </div>

              <div className="flex-cols user-details">
                <span>{user.name}</span>
                <span>{user.email}</span>
                {getCreatedAtDate(user)}
              </div>
            </div>

            <div className="btn-cntr  circle-btn-cntr">
              <div className="btn-label">
                <span className="btn-label__text xs-caps">
                  Edit user
                </span>
              </div>
              <button

              className="edit-btn circle-icon-btn button btn-grey"
              label="Edit user"
              onClick={handleClick}
              >
                <BiPencil />
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="flex-cols profile-btn-cntr">
        <Button
        children="Sign out"
        styleType="btn"
        label="Sign out"
        onClick={handleSignOut}
        disabled={false}
        />

        <Button
        children="Delete user"
        styleType="btn-outline"
        label="Delete user"
        onClick={handleUserDelete}
        data-id={uid}
        disabled={false}
        />
        
      </div>

    </section>
  )
};

