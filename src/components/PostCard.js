import { useNavigate } from "react-router-dom";

export default function PostCard({ task }) {
  //prop er task, kunne kaldes alt mulig. skal matche med det data der hentes fra firebase.
    const navigate = useNavigate(); 
    
    function handleClick() {
        navigate(`/update/${task.id}`);
    } //kaldes når brugeren klikker på 'updatpe knappen, og navigere videre til update side.

    return (
        <>
            <article>
                <div className="postcard-cntr">
                    <div className="postcard-elem-checkbox">
                        <div className="checkbox_div">
                        <input type="checkbox" />
                        </div>
                    </div>

                    <div className="postcard-elem-todotext">
                        <div className="todo__text">
                        <h3>{task.title}</h3>
                        <p>{task.date}</p>
                        </div>
                    </div>

                    <div className="postcard-elem-updatebtn">
                        <div className="update">
                        <button className="post-update-btn" onClick={handleClick}>
                            update
                        </button>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}