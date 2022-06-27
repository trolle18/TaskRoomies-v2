import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { MdHandyman, MdLocalDining } from "react-icons/md";
// import { MdCleanHands, MdWaterDrop, MdBed, MdShower, MdChair } from "react-icons/md";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCouch } from '@fortawesome/free-solid-svg-icons';
// import couchIcon from '../../assets/icons/couch-solid.svg';
import "./TaskForms.css";



export default function GroupTaskForm({ saveGroupTask, grouptask }) {
    const [title, setTitle] = useState("");
    // const [icon, setIcon] = useState("");
    const [person, setPerson] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (grouptask) {   
            setTitle(grouptask.title);
            // setIcon(grouptask.icon);
            setPerson(grouptask.person);
            setDate(grouptask.date);
        }
    }, [grouptask]);


    function handleSubmit(event) {
        event.preventDefault(); 

        const grouptaskData = { 
            title: title,
            // icon: icon,
            person: person,
            date: date,
        };
        saveGroupTask(grouptaskData); 
        navigate("/"); 
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Task title</span>
                    <input placeholder="New task ..." type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>

                {/* <label>
                    <select className="icon-select" placeholder="" value={icon} onChange={(e) => setIcon(e.target.value)}>
                        <option className="icon-option" value="">Icon</option>
                        <option className="icon-option" value="tools" data-icon="./assets/icons/couch-solid.svg"> Tools <MdHandyman /></option>
                        <option className="icon-option" value="cutlery" data-icon={couchIcon}> <FontAwesomeIcon icon={faCouch}/> Cutlery <MdLocalDining /> </option>
                    </select>
                </label> */}

                <label>
                    <span>Who is doing the task?</span>
                    <select value={person} onChange={(e) => setPerson(e.target.value)} >
                        <option value="fælles">Fælles</option>
                        <option value="mikkel">Mikkel</option>
                        <option value="sofie">Sofie</option>
                    </select>
                </label>
                
                <label>
                    <span>When?</span>
                    <input type="date" pattern="\d{4}-\d{2}-\d{2}" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>

                <button type="submit">Save</button>
            </form>
    </>
    );
}