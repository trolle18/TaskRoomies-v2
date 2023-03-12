import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { usersRef } from "../firebase-config";
import 'firebase/database';
import placerholder from "../assets/profile-placeholder.jpg";
import Button from "./Button";


export default function UpdateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  // const [createdAt, setCreatedAt] = useState("");
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  
  // // Get current user data 
  // useEffect(() => {
  //   async function getUser() {
  //   if (auth.currentUser) {
  //     setEmail(auth.currentUser.email)
  //     const docRef = doc(usersRef, auth.currentUser.uid)
  //     const userData = (await getDoc(docRef)).data()      
  //     const docSnap = await getDoc(docRef)
  //     if (userData) {
  //       setUser((prevUser) => ({ ...prevUser, ...docSnap.data() }))
  //       setName(userData.name)
  //       setImage(userData.image || 'placeholder')
  //       // setCreatedAt(userData.createdAt)
  //     }
  //   }}
  //   getUser()
  // }, [auth.currentUser])


  // // Change user image
  // function handleImageChange(event) {
  //   const file = event.target.files[0]
  //   if (file.size < 500000) { // image file size must be below 0,5MB
  //     const reader = new FileReader()
  //     reader.onload = (event) => {
  //         setImage(event.target.result)
  //     }
  //     reader.readAsDataURL(file)
  //     setErrorMessage("") // reset errorMessage state
  //   } else { // if image >0.5MB, display an error message using the errorMessage state
  //     setErrorMessage("The image file is too big! The image file size must be below 0,5MB")
  //   }
  // } 


  // // Submit updated user details
  // async function submitEvent(event) {
  //   event.preventDefault()
  //   const userToUpdate = { name: name, image: image }
  //   const docRef = doc(usersRef, auth.currentUser.uid)
  //   await setDoc(docRef, userToUpdate)
  //   navigate("/profile")
  // }

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
    navigate("/profile")
  }

  function navigateToProfile() {
    navigate("/profile")
  }

  
  

  return (
    <form onSubmit={submitEvent}>

    <div className="flex-cols">
      <div className="profile-avatar">
        <div className="user-img">
          <img src={ user.image} alt={user.name}  
          // onChange={(event) => (event.target.src)}
          onError={(event) => (event.target.src = placerholder)} />
        </div>
      </div>

      <div className="flex-rows">
        <span className="bold">Profile picture</span>
        <span className="text-error">{errorMessage}</span>
        <div className="img-input-cntr">
          <input 
          type="file" 
          accept="image/*" 
          value="" 
          // defaultValue={image}
          label="profile picture input" 
          onChange={handleImageChange}
          // className="img-input"
          />
        </div>
        </div>
    </div>

    <div className="flex-inner-wrapper max-w">
      <div className="flex-rows space-between">

        <div className="flex-rows">
          <div className="flex-cols user-details">
            <span className="bold">Name</span>
            <span className="bold">Email</span>
          
          </div>

          <div className="flex-cols user-details">                
            <input  type="text" value={name} onChange={e => setName(e.target.value)} name="name" placeholder="name"  />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}  name="email" placeholder="user@mail.com"  />
            <input type="date" 
            value={user?.createdAt} 
            readOnly 
            // defaultValue={createdAt}
            //  onChange={e => setCreatedAt(e.target.value)}
            />
          
          </div>
        </div>
      </div> 
    </div>  

    <span>User created {user?.createdAt}</span>


    <div className="flex-cols profile-btn-cntr">
      {/* <button 
      type="submit"
      className="btn" 
      label="Save Changes"
      >
        Save
      </button>     */}

      <Button
      children="Save changes"
      styleType="btn"
      type="submit"
      label="Save Changes"
      onClick={navigateToProfile}
      disabled={false}
      /> 

      <Button
      children="Discard changes"
      styleType="btn-outline"
      label="Discard changes"
      onClick={navigateToProfile}
      disabled={false}
      />


    </div>
      
    </form>

  )
};
