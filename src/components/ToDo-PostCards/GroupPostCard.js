import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiCalendarEvent } from "react-icons/bi"
import couchIcon from "../../assets/icons/couch-solid.svg";
import "./ToDoPostCards.css";


export default function GroupPostCard({ grouptask }) {
    const navigate = useNavigate();
    const [checked, setChecked] = useState();

    function handleClick() {
        navigate(`/groupupdate/${grouptask.id}`);
    }
    
    // Checkbox 
        const onChange = () => {
            setChecked(!checked);
        };

        const Checkbox = ({checkboxId, value, onChange}) => {
            return (
                <input 
                    type='checkbox' 
                    name="checkbox" 
                    id={grouptask.checkboxId}
                    checked={value}
                    onChange={onChange}
                    className="checkbox-input"
                />
            )
        };  console.log({onChange})

    
    return (
        <>
            <div className="postcard-cntr">

                <div className="postcard-elem checkbox-elem">
                    <div className="checkbox-box">
                        <Checkbox 
                            type='checkbox' 
                            name="checkbox" 
                            id="checkbox"
                            checked={checked}
                            // onChange={onChange}
                            className="checkbox-input"
                        />
                    </div>
                </div>

                <div className="postcard-elem todo-elem" onClick={handleClick}>
                    <label for="checkbox" className="todo-text">
                        <div className="todo-text-title">
                            <div className="todo-img">
                                <img src={couchIcon} alt="" />
                            </div>
                            <h3>{grouptask.title}</h3>
                        </div>
                        <div className="todo-text-details">
                            <p>{grouptask.person}</p>
                            <p><BiCalendarEvent/> {grouptask.date}</p>
                        </div>
                        
                    </label>
                </div>

                {/* <div className="postcard-elem updt-elem">
                    <div className="update">
                        <button onClick={handleClick}> <BsPencilSquare/> </button>
                    </div>
                </div>  */}
            </div>
        </>
    );
}