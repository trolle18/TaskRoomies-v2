import UserName from "./UserName";
import UserImg from "./UserImg";



export default function WelcomeCard({ post }) {
    return (
        <article className="welcome-card">
            <div className="welcome-userimg">
                <UserImg /> 
            </div>
            <div className="welcome-msg">
                <h2> Hej, <UserName />! </h2>
                {/* <p> {" "} Du har allerede klaret 5 af de opgaver du har til ugen - sådan!  <br /> </p> */}
            </div>
        </article>
    );
}