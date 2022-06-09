import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



export default function SignInPage() {
    const [errorMessage, setErrorMessage] = React.useState("");
    const navigate = useNavigate();

    function signIn(event) {
        event.preventDefault();
        const mail = event.target.mail.value;
        const password = event.target.password.value;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
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



    return (
        <section className="page">
            <div className="signin-cntr">
                <form className="signin-form" onSubmit={signIn}>
                    <h1 className="logo"> Task<span>Roomies</span> </h1>
                    <p>Sign in</p>
                    <input type="email" name="mail" placeholder="Email" />
                    <input type="password" name="password" placeholder="Password" />
                    <p className="text-error">{errorMessage}</p>
                    <button className="signin-btn">Sign in</button>
                
                    <p className="text-center">
                        Dont have a user?
                        <Link to="/signup">Sign up</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}