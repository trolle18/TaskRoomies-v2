import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { usersRef } from "../firebase-config";
import 'firebase/database';
import UpdateUserForm from "../components/UpdateUserForm";


export default function UpdateProfilePage() {
  const auth = getAuth();

  
  // // Get current user data 
  // useEffect(() => {
  //   async function getUser() {
  //     if (auth.currentUser) {
  //       setEmail(auth.currentUser.email)
  //       const docRef = doc(usersRef, auth.currentUser.uid)
  //       const userData = (await getDoc(docRef)).data()      
  //       const docSnap = await getDoc(docRef)
  //       if (userData) {
  //         setUser((prevUser) => ({ ...prevUser, ...docSnap.data() }))
  //         setName(userData.name)
  //         setImage(userData.image || 'placeholder')
  //       }
  //   }}
  //   getUser()
  // }, [auth.currentUser]);


  // // Change user image
  // function handleImageChange(event) {
  //   const file = event.target.files[0]
  //   if (file.size < 500000) { // image file size must be below 0,5MB
  //     const reader = new FileReader()
  //     reader.onload = (event) => {
  //       setImage(event.target.result)
  //     }
  //     reader.readAsDataURL(file)
  //     setErrorMessage("") // reset errorMessage state
  //   } else { // if image >0.5MB, display an error message using the errorMessage state
  //     setErrorMessage("The image file is too big! The image file size must be below 0,5MB")
  //   }
  // };


  // // Submit updated user details
  // async function submitEvent(event) {
  //   event.preventDefault()
  //   const userToUpdate = { name: name, image: image }
  //   const docRef = doc(usersRef, auth.currentUser.uid)
  //   await setDoc(docRef, userToUpdate)
  //   navigate("/profile")
  // };

  
  return (
    <section className="page">
      <div className="page__header-cntr">
          <h3>Edit User</h3>
      </div>     
      <UpdateUserForm/>                 
    </section>
  )
};
