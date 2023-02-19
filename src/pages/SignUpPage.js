import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { usersRef } from "../firebase-config";
import placerholder from "../assets/profile-placeholder.jpg";


export default function SignUpPage() {
    const [errorMessage, setErrorMessage] = React.useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    function signUp(event) {
        event.preventDefault();
        const email = event.target.mail.value;
        const password = event.target.password.value;
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, image, name, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const docRef = doc(usersRef, user.uid);
            setDoc(docRef, { name, image, email });
            // ...
            navigate("/");
            console.log(user);
        })

        .catch((error) => {
            let code = error.code;
            code = code.replaceAll("-", " ");
            code = code.replaceAll("auth/", "");
            setErrorMessage(code);
        });
    }

    // Handle user image
    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file.size < 500000) { // image file size must be below 0,5MB
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
            }
            reader.readAsDataURL(file);
            // setErrorMessage("") // reset errorMessage state
        } else { // if image >0.5MB, display an error message using the errorMessage state
            setErrorMessage("The image file is too big! The image file size must be below 0,5MB");
        }
    }


    
    return (
        <section className="page">
            <div className="signin-cntr">
                <form className="signin-form" onSubmit={signUp}>
                    <h1 className="logo"> Task<span>Roomies</span> </h1>
                    <h2 className="text-center">Sign up</h2>

                    
                    <img src={image} onError={(event) => (event.target.src = placerholder)}
                        id="imagePreview" className="image-preview " alt="placeholder"  
                    />
                    <input type="file" accept="image/*" value="" onChange={handleImageChange}  name="image" className="img-input"/>

                    <input type="text" name="name" placeholder="Name" onChange={e => setName(e.target.value)} />
                    <input type="email" name="mail" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    <input type="password" name="password" placeholder="Password" />
                    <p className="text-error">{errorMessage}</p>

                    <button className="signin-btn">Sign up</button>
                    
                    <p className="text-center">
                        <strong>Already have a user? </strong>
                        <Link to="/signin">Sign in</Link>
                    </p>
                </form>
            </div>
        </section>
    )
};
