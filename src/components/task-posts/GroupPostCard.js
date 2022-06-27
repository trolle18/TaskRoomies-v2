import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiCalendarEvent } from "react-icons/bi";
import couchIcon from "../../assets/icons/couch-solid.svg";
import "./ToDoPostCards.css";
// import { grouptaskRef } from "../../firebase-config";


export default function GroupPostCard({ grouptask }) {
    const navigate = useNavigate();
    const [complete, setComplete] = useState(false);

    // When task is clicked, navigate to update page
    function handleClick() {
        navigate(`/groupupdate/${grouptask.id}`);
    }

    // Sets checkbox state 
    const handleOnChange = () => {
        setComplete(!complete);
        console.log(!complete, grouptask.id)
    };



    // const handleOnChange = () => {
    //     setComplete(!complete);
    //     console.log(!complete, grouptask.id)
    // };


    // function handleOnChange() {
    //     grouptask.collection("grouptask").doc(grouptask).update({
    //         complete: !complete,
    //     });
    //     setComplete(!complete);
    //     console.log(!complete, grouptask)
    // }


    
    return (
        <>          
            <div className="postcard-cntr" key={grouptask.id}>

                <div className="postcard-elem checkbox-elem">
                    <div className="checkbox-box">
                        {
                            complete ? 
                            <input 
                                type="checkbox" 
                                name="checkbox" 
                                checked="true"
                                onChange={handleOnChange}
                                className="checkbox-input"
                            />
                            :
                            <input 
                                type="checkbox" 
                                name="checkbox" 
                                checked="false"
                                onChange={handleOnChange}
                                className="checkbox-input"
                            />
                        }
                    </div>
                </div>

                <div className="postcard-elem todo-elem" onClick={handleClick}>
                    <label className="todo-text">

                        <div className="todo-text-title">
                            <div className="todo-img">
                                <img src={couchIcon} alt="" />
                            </div>
                            <h3>{grouptask.title}</h3>
                            <p>{complete ? "completed" : "pending..."}</p>
                        </div>

                        <div className="todo-text-details">
                            <p>{grouptask.person}</p>
                            <p><BiCalendarEvent/> {grouptask.date}</p>
                        </div>
                        
                    </label>
                </div>

            </div>
        </>
    );
}