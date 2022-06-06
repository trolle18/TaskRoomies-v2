import { useNavigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs"

export default function GroupPostCard({ grouptask }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/groupupdate/${grouptask.id}`);
    }

    return (
        <>
            <article>
                <div className="postcard-cntr">

                    <div className="postcard-elem checkbox-elem">
                        <div className="checkbox">
                            <input type='checkbox' name="checkbox" />
                        </div>
                    </div>

                    <div className="postcard-elem todo-elem">
                        <label for="checkbox" className="todo-text">
                            <h3>{grouptask.title}</h3>
                            <p>{grouptask.date}</p>
                            <p>{grouptask.person}</p>
                        </label>
                    </div>

                    <div className="postcard-elem updt-elem">
                        <div className="update">
                            <button onClick={handleClick}> <BsPencilSquare/> </button>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}