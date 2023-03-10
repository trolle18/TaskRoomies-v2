// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";
// import { doc, getDoc, setDoc } from "@firebase/firestore";
// import { usersRef } from "../firebase-config";
// import 'firebase/database';
import UpdateUserForm from "../components/UpdateUserForm";
// import placerholder from "../assets/profile-placeholder.jpg";



export default function UpdateProfilePage() {


  

  
  return (
    <section className="page">
      <div className="page__header-cntr">
          <h3>Edit User</h3>
      </div>    
      <div className="card-wrapper" >
      <UpdateUserForm
      // submitEvent={submitEvent} 
      // user={user}
      />                 

      </div>
    </section>
  )
};
