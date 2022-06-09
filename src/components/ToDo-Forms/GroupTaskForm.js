import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdHandyman, MdLocalDining, MdCleanHands, MdWaterDrop, MdBed, MdShower } from "react-icons/md";
// import { MdChair } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import couchIcon from '../../assets/icons/couch-solid.svg';


export default function GroupTaskForm({ saveGroupTask, grouptask }) {
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [person, setPerson] = useState("");
    const [date, setDate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (grouptask) {   
            setTitle(grouptask.title);
        }
    }, [grouptask]);


    function handleSubmit(event) {
        event.preventDefault(); 

        const grouptaskData = { 
            title: title,
            icon: icon,
            person: person,
            date: date,
        };
        saveGroupTask(grouptaskData); 
        navigate("/"); 
    }



    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input placeholder="New task ..." type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>

            <label>
                <select className="icon-select" placeholder="" value={icon} onChange={(e) => setIcon(e.target.value)}>
                    <option className="icon-option" value="">Icon</option>
                    <option className="icon-option" value="tools" data-icon="./assets/icons/couch-solid.svg"> Tools <MdHandyman /></option>
                    <option className="icon-option" value="cutlery" data-icon={couchIcon}> <FontAwesomeIcon icon={faCouch}/> Cutlery <MdLocalDining /> </option>
                    <option className="icon-option" value="wash"> <FontAwesomeIcon icon={faCouch}/> Wash <MdCleanHands/> </option>
                    <option className="icon-option" value="water"> <FontAwesomeIcon icon={faCouch}/> Water <MdWaterDrop/> </option>
                    <option className="icon-option" value="bed"> <FontAwesomeIcon icon={faCouch}/> Bed <MdBed/> </option>
                    <option className="icon-option" value="couch"> <FontAwesomeIcon icon={faCouch}/> Couch </option>
                    <option className="icon-option" value="bath"> <FontAwesomeIcon icon={faCouch}/> Bath <MdShower/> </option>
                </select>
            </label>

            <label>
                <select placeholder="" value={person} onChange={(e) => setPerson(e.target.value)} >
                    <option value="">Whos doing the task?</option>
                    <option value="fælles">Fælles</option>
                    <option value="Mikkel">Mikkel</option>
                    <option value="Sofie">Sofie</option>
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