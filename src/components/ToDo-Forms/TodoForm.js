import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdHandyman, MdLocalDining, MdCleanHands, MdWaterDrop, MdBed, MdShower } from "react-icons/md";
// import { MdChair } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import couchIcon from '../../assets/icons/couch-solid.svg';
import "./ToDoForms.css";


export default function TodoForm({ saveTask, task }) {
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDate(task.date);
        }
    }, [task]);

    function handleSubmit(event) {
        event.preventDefault();

        const taskData = {
            title: title,
            icon: icon,
            date: date,
        };
        saveTask(taskData);
        navigate("/");
    }

    

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input placeholder="Type..." type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>

            <label>
                <select className="icon-select" placeholder="" value={icon} onChange={(e) => setIcon(e.target.value)}>
                    <option className="icon-option" value="">Icon</option>
                    <option className="icon-option" value="tools" data-icon="./assets/icons/couch-solid.svg"> Tools <MdHandyman/> </option>
                    <option className="icon-option" value="cutlery" data-icon={couchIcon}> <FontAwesomeIcon icon={faCouch}/> Cutlery <MdLocalDining/> </option>
                    <option className="icon-option" value="wash"> <FontAwesomeIcon icon={faCouch}/> Wash <MdCleanHands/> </option>
                    <option className="icon-option" value="water"> <FontAwesomeIcon icon={faCouch}/> Water <MdWaterDrop/> </option>
                    <option className="icon-option" value="bed"> <FontAwesomeIcon icon={faCouch}/> Bed <MdBed/> </option>
                    <option className="icon-option" value="couch"> <FontAwesomeIcon icon={faCouch}/> Couch </option>
                    <option className="icon-option" value="bath"> <FontAwesomeIcon icon={faCouch}/> Bath <MdShower/> </option>
                </select>
            </label>

            <label>
                When?
                <input placeholder="" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>

            <button type="submit">Save</button>
        </form>
    );
}